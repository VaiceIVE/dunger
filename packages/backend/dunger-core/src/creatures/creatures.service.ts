import { Injectable } from '@nestjs/common';
import { CreateCreatureManualDto } from './dto/create-creature-manual.dto';
import { Ability, Prisma, PrismaClient, Skill } from '@dunger/prisma';
import { nullSpeedObject } from './objects/nullSpeed.object';
import { nullSensesObject } from './objects/nullSenses.object';
import {
  ApiCreature,
  ApiCreatureInput,
  ApiCreatureList,
  ApiPaginatedResult,
  PaginationQueryDto,
} from 'src/common/dto';
import { ConfigService } from '@nestjs/config';
import { creatureInclude } from './includes/creature.include';
import { AppError } from 'src/common/errors';
import { HttpStatus } from '@dunger/common-enums';
import { mapAbilitiesToApiStats } from './utils/stats.mapper';
import { mapAbilitiesToApiSkills } from './utils/skills.mapper';
import { CreateCreatureAiDto } from './dto/create-creature-ai.dto';
import axios from 'axios';

@Injectable()
export class CreaturesService {
  private readonly customContentSource: string;

  constructor(
    private readonly prisma: PrismaClient,
    private readonly configService: ConfigService,
  ) {
    this.customContentSource = this.configService.get<string>(
      'CUSTOM_CONTENT_SOURCE',
    );
  }

  /**
   * Создаёт существо вручную, опционально на основе шаблона.
   * Устанавливает источник как кастомный (по shortName из this.customContentSource).
   *
   * @param createCreatureDto - Данные для создания существа вручную.
   * @param userId - id пользователя, который создает существо.
   * @returns id созданного существа.
   */
  async initCreature(
    createCreatureDto: CreateCreatureManualDto,
    userId: string,
  ) {
    const { template_id, name, challenge_rating } = createCreatureDto;

    // Получаем id кастомного источника (например, "DUNGER")
    const customSourceId = (
      await this.prisma.source.findUnique({
        where: { short_name: this.customContentSource },
        select: { id: true },
      })
    )?.id;

    const creatureData = {
      name,
      challenge_rating,
      source_id: customSourceId,
      creator_id: userId,
    };

    // Если указан шаблон — копируем все поля, кроме id, и переопределяем имя/CR/source
    if (template_id) {
      const template = await this.prisma.creature.findUnique({
        where: { id: template_id },
      });

      if (template) {
        const { id: _, ...templateData } = template;
        return this.prisma.creature.create({
          data: { ...templateData, ...creatureData },
          select: { id: true },
        });
      }
    }

    // Если шаблона нет — создаём существо с переданными полями
    return this.prisma.creature.create({
      data: creatureData,
      select: { id: true },
    });
  }

  /**
   * Генерирует существо, создает запись в истории генераций.
   * Устанавливает источник как кастомный (по shortName из this.customContentSource).
   *
   * @param generateCreatureDto - Данные для генерации существа.
   * @param userId - id пользователя, который создает существо.
   * @param creatureId - id созданного существа, которое перегенируют.
   * @returns id созданного существа.
   */
  async generateCreature(
    generateCreatureDto: CreateCreatureAiDto,
    userId: string,
    creatureId?: string,
  ): Promise<{ id: string }> {
    const gptUrl = `${this.configService.get('GPT_BASE_URL')}/gpt/generate/creature`;

    const aiCreatureData: ApiCreatureInput = await this.requestAiGeneration(
      gptUrl,
      generateCreatureDto,
    );

    const id =
      creatureId ?? (await this.initCreature(generateCreatureDto, userId)).id;

    await this.update(id, aiCreatureData);

    await this.prisma.gPTCreatureRequest.upsert({
      where: { creature_id: id },
      update: generateCreatureDto,
      create: {
        creature_id: id,
        ...generateCreatureDto,
      },
    });

    return { id };
  }

  private async requestAiGeneration(
    url: string,
    payload: CreateCreatureAiDto,
  ): Promise<ApiCreatureInput> {
    try {
      const { data } = await axios.post(url, payload);
      return data;
    } catch {
      throw new AppError({
        errorText: 'Failed to AI generation',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      });
    }
  }

  /**
   * Возвращает список существ из книги с пагинацией и фильтрацией по имени.
   * Исключает существа, источник которых соответствует кастомному контенту (shortName берётся из configService).
   *
   * @param query - Объект с параметрами пагинации и поиска.
   * @returns Существа + информация о пагинации.
   */
  async findAllPublic(
    query: PaginationQueryDto,
  ): Promise<{ creatures: ApiCreatureList } & ApiPaginatedResult> {
    const { query: search, offset, limit } = query;

    // Получаем id кастомного источника (например, 'DUNGER'), чтобы исключить его из выборки
    const dungerSource = await this.prisma.source.findUnique({
      where: { short_name: this.customContentSource },
      select: { id: true },
    });

    const excludeSourceId = dungerSource?.id;

    const where = {
      ...(search
        ? { name: { contains: search, mode: 'insensitive' as const } }
        : {}),
      ...(excludeSourceId ? { source_id: { not: excludeSourceId } } : {}),
    };

    const [creaturesRaw, totalCount] = await Promise.all([
      this.prisma.creature.findMany({
        select: {
          id: true,
          name: true,
          challenge_rating: true,
          type_relation: {
            select: {
              name: true,
            },
          },
          alignment_relation: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [{ challenge_rating_meta: { numeric: 'asc' } }, { id: 'asc' }],
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.creature.count({ where }),
    ]);

    const creatures: ApiCreatureList = creaturesRaw.map(
      ({ alignment_relation, type_relation, ...rest }) => ({
        ...rest,
        type_name: type_relation?.name,
        alignment_name: alignment_relation?.name,
      }),
    );

    return {
      pagination: { limit, offset, totalCount },
      creatures,
    };
  }

  /**
   * Возвращает список существ, которых создал пользователь, с пагинацией и фильтрацией по имени.
   *
   * @param query - Объект с параметрами пагинации и поиска.
   * @param userId - id пользователя, который создал существ.
   * @returns Существа + информация о пагинации.
   */
  async findAllUser(
    query: PaginationQueryDto,
    userId: string,
  ): Promise<{ creatures: ApiCreatureList } & ApiPaginatedResult> {
    const { query: search, offset, limit } = query;

    const where = {
      ...(search
        ? { name: { contains: search, mode: 'insensitive' as const } }
        : {}),
      creator_id: userId,
    };

    const [creaturesRaw, totalCount] = await Promise.all([
      this.prisma.creature.findMany({
        select: {
          id: true,
          name: true,
          challenge_rating: true,
          type_relation: {
            select: {
              name: true,
            },
          },
          alignment_relation: {
            select: {
              name: true,
            },
          },
        },
        orderBy: [{ challenge_rating_meta: { numeric: 'asc' } }, { id: 'asc' }],
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.creature.count({ where }),
    ]);

    const creatures: ApiCreatureList = creaturesRaw.map(
      ({ alignment_relation, type_relation, ...rest }) => ({
        ...rest,
        type_name: type_relation?.name,
        alignment_name: alignment_relation?.name,
      }),
    );

    return {
      pagination: { limit, offset, totalCount },
      creatures,
    };
  }

  /**
   * Возвращает количество существ, созданных пользователем.
   *
   * @param userId - id пользователя.
   * @param search - Поисковый запрос (опционально).
   * @returns Количество существ.
   */
  async countUserCreatures(userId: string, search?: string): Promise<number> {
    const where = {
      ...(search
        ? { name: { contains: search, mode: 'insensitive' as const } }
        : {}),
      creator_id: userId,
    };

    return this.prisma.creature.count({ where });
  }

  /**
   * Возвращает список шаблонов с пагинацией и фильтрацией по имени.
   * Исключает шаблоны, источник которых соответствует кастомному контенту (shortName берётся из configService).
   *
   * @param query - Объект с параметрами пагинации и поиска.
   * @returns Шаблоны + информация о пагинации.
   */
  async findTemplates(query: PaginationQueryDto) {
    const { query: search, offset, limit } = query;

    // Получаем id кастомного источника (например, 'DUNGER'), чтобы исключить его из выборки
    const dungerSource = await this.prisma.source.findUnique({
      where: { short_name: this.customContentSource },
      select: { id: true },
    });

    const excludeSourceId = dungerSource?.id;

    const where = {
      ...(search ? { name: { contains: search } } : {}),
      ...(excludeSourceId ? { source_id: { not: excludeSourceId } } : {}),
    };

    const [templatesRaw, total] = await this.prisma.$transaction([
      this.prisma.creature.findMany({
        where,
        select: { id: true, name: true },
        skip: offset,
        take: limit,
      }),
      this.prisma.creature.count({ where }),
    ]);

    return {
      pagination: {
        limit,
        offset,
        totalCount: total,
      },
      templates: templatesRaw,
    };
  }

  async findOne(id: string) {
    return this.selectCreatureForCard(id);
  }

  async findTraitsGroups(query: PaginationQueryDto) {
    let results;
    let total;
    if (query.query) {
      results = await this.prisma.trait.groupBy({
        by: ['name'],
        where: {
          name: {
            contains: query.query,
          },
          is_template: true,
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.trait.groupBy({
        by: ['name'],
        _count: true,
      });
      total = total.length;
    } else {
      results = await this.prisma.trait.groupBy({
        by: ['name'],
        where: {
          is_template: true,
        },
        _count: {
          id: true,
        },
        orderBy: {
          _count: {
            id: 'desc',
          },
        },
      });
      total = await this.prisma.trait.groupBy({
        by: ['name'],
      });
      total = total.length;
    }

    results = results.slice(query.offset, query.offset + query.limit);

    return {
      pagination: {
        limit: query.limit,
        offset: query.offset,
        totalCount: total,
      },
      results: results.map((res) => ({ count: res._count.id, name: res.name })),
    };
  }

  async findActionsGroups(query: PaginationQueryDto) {
    const { query: search, limit, offset } = query;

    const where: Prisma.ActionWhereInput = {
      is_template: true,
      ...(search && {
        name: {
          contains: search,
        },
      }),
    };

    const groups = await this.prisma.action.groupBy({
      by: ['name'],
      where,
      _count: {
        id: true,
      },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });

    const paginated = groups.slice(offset, offset + limit);

    return {
      pagination: {
        limit,
        offset,
        totalCount: groups.length,
      },
      results: paginated.map((group) => ({
        name: group.name,
        count: group._count.id,
      })),
    };
  }

  async findTraitsGroup(groupName: string) {
    return await this.prisma.trait.findMany({
      where: {
        name: groupName,
        is_template: true,
      },
    });
  }

  async findActionsGroup(groupName: string) {
    return await this.prisma.action.findMany({
      where: {
        name: groupName,
        is_template: true,
      },
    });
  }

  private cleanObj(obj: ApiCreatureInput) {
    const newobj = {};
    const complexPropnames: (keyof ApiCreatureInput)[] = [
      'speed',
      'stats',
      'skills',
      'languages_ids',
      'actions_ids',
      'traits_ids',
      'size_id',
      'resistances_ids',
      'immunities_ids',
      'vulnerabilities_ids',
      'resistances',
      'immunities',
      'vulnerabilities',
      'senses',
      'languages',
      'alignment_relation',
      'type_relation',
      'size_relation',
      'biome_relation',
      'biomes_ids',
      'race_relation',
    ];
    for (const propname in obj) {
      if (
        !(
          obj[propname] === null ||
          obj[propname] === undefined ||
          complexPropnames.includes(propname as keyof ApiCreatureInput)
        )
      ) {
        newobj[propname] = obj[propname];
      }
    }
    return newobj;
  }

  async update(id: string, updateCreatureDto: ApiCreatureInput) {
    const cleanedUpdatedCreatureDto = this.cleanObj(updateCreatureDto);

    await this.prisma.creature.update({
      where: { id: id },
      data: {
        ...cleanedUpdatedCreatureDto,
      },
    });

    if (updateCreatureDto.senses) {
      await this.prisma.creature.update({
        where: { id },
        data: {
          senses: {
            upsert: {
              where: { creature_id: id },
              create: updateCreatureDto.senses,
              update: {
                passive_perception: updateCreatureDto.senses.passive_perception,
              },
            },
          },
        },
      });
    }

    const updates: Prisma.CreatureUpdateInput = {};

    if (updateCreatureDto.size_id) {
      updates.size_relation = { connect: { id: updateCreatureDto.size_id } };
    }

    if (updateCreatureDto.size_relation) {
      updates.size_relation = {
        connect: { id: updateCreatureDto.size_relation.name },
      };
    }

    if (updateCreatureDto.alignment_relation) {
      updates.alignment_relation = {
        connect: { name: updateCreatureDto.alignment_relation.name },
      };
    }

    if (updateCreatureDto.type_relation) {
      updates.type_relation = {
        connect: { name: updateCreatureDto.type_relation.name },
      };
    }

    if (updateCreatureDto.speed) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          speed: {
            upsert: {
              where: {
                creature_relation: {
                  id: id,
                },
              },
              create: updateCreatureDto.speed,
              update: {
                walk: updateCreatureDto.speed?.walk ?? null,
                fly: updateCreatureDto.speed?.fly ?? null,
                climb: updateCreatureDto.speed?.climb ?? null,
                swim: updateCreatureDto.speed?.swim ?? null,
              },
            },
          },
        },
      });
    }

    if (updateCreatureDto.stats) {
      const statsData = [
        {
          where: { ability: Ability.STRENGTH },
          data: {
            value: +updateCreatureDto.stats.strength.value,
            mastery: updateCreatureDto.stats.strength.mastery,
          },
        },
        {
          where: { ability: Ability.DEXTERITY },
          data: {
            value: +updateCreatureDto.stats.dexterity.value,
            mastery: updateCreatureDto.stats.dexterity.mastery,
          },
        },
        {
          where: { ability: Ability.CONSTITUTION },
          data: {
            value: +updateCreatureDto.stats.constitution.value,
            mastery: updateCreatureDto.stats.constitution.mastery,
          },
        },
        {
          where: { ability: Ability.INTELLIGENCE },
          data: {
            value: +updateCreatureDto.stats.intelligence.value,
            mastery: updateCreatureDto.stats.intelligence.mastery,
          },
        },
        {
          where: { ability: Ability.WISDOM },
          data: {
            value: +updateCreatureDto.stats.wisdom.value,
            mastery: updateCreatureDto.stats.wisdom.mastery,
          },
        },
        {
          where: { ability: Ability.CHARISMA },
          data: {
            value: +updateCreatureDto.stats.charisma.value,
            mastery: updateCreatureDto.stats.charisma.mastery,
          },
        },
      ];

      await this.prisma.creature.update({
        where: { id: id },
        data: {
          stats: {
            upsert: {
              where: { id: id },
              create: {
                stats: {
                  createMany: {
                    data: statsData.map((s) => ({ ...s.where, ...s.data })),
                  },
                },
              },
              update: {
                stats: {
                  updateMany: statsData,
                },
              },
            },
          },
        },
      });
    }

    if (updateCreatureDto.skills) {
      const skillsData = [
        {
          where: { skill: Skill.ATHLETICS },
          data: {
            value: +updateCreatureDto.skills.strength.athletics.value,
            mastery: updateCreatureDto.skills.strength.athletics.mastery,
          },
        },
        {
          where: { skill: Skill.ACROBATICS },
          data: {
            value: +updateCreatureDto.skills.dexterity.acrobatics.value,
            mastery: updateCreatureDto.skills.dexterity.acrobatics.mastery,
          },
        },
        {
          where: { skill: Skill.SLEIGHT_OF_HAND },
          data: {
            value: +updateCreatureDto.skills.dexterity.sleight_of_hand.value,
            mastery: updateCreatureDto.skills.dexterity.sleight_of_hand.mastery,
          },
        },
        {
          where: { skill: Skill.STEALTH },
          data: {
            value: +updateCreatureDto.skills.dexterity.stealth.value,
            mastery: updateCreatureDto.skills.dexterity.stealth.mastery,
          },
        },
        {
          where: { skill: Skill.ARCANA },
          data: {
            value: +updateCreatureDto.skills.intelligence.arcana.value,
            mastery: updateCreatureDto.skills.intelligence.arcana.mastery,
          },
        },
        {
          where: { skill: Skill.HISTORY },
          data: {
            value: +updateCreatureDto.skills.intelligence.history.value,
            mastery: updateCreatureDto.skills.intelligence.history.mastery,
          },
        },
        {
          where: { skill: Skill.INVESTIGATION },
          data: {
            value: +updateCreatureDto.skills.intelligence.investigation.value,
            mastery:
              updateCreatureDto.skills.intelligence.investigation.mastery,
          },
        },
        {
          where: { skill: Skill.NATURE },
          data: {
            value: +updateCreatureDto.skills.intelligence.nature.value,
            mastery: updateCreatureDto.skills.intelligence.nature.mastery,
          },
        },
        {
          where: { skill: Skill.RELIGION },
          data: {
            value: +updateCreatureDto.skills.intelligence.religion.value,
            mastery: updateCreatureDto.skills.intelligence.religion.mastery,
          },
        },
        {
          where: { skill: Skill.ANIMAL_HANDLING },
          data: {
            value: +updateCreatureDto.skills.wisdom.animal_handling.value,
            mastery: updateCreatureDto.skills.wisdom.animal_handling.mastery,
          },
        },
        {
          where: { skill: Skill.INSIGHT },
          data: {
            value: +updateCreatureDto.skills.wisdom.insight.value,
            mastery: updateCreatureDto.skills.wisdom.insight.mastery,
          },
        },
        {
          where: { skill: Skill.MEDICINE },
          data: {
            value: +updateCreatureDto.skills.wisdom.medicine.value,
            mastery: updateCreatureDto.skills.wisdom.medicine.mastery,
          },
        },
        {
          where: { skill: Skill.PERCEPTION },
          data: {
            value: +updateCreatureDto.skills.wisdom.perception.value,
            mastery: updateCreatureDto.skills.wisdom.perception.mastery,
          },
        },
        {
          where: { skill: Skill.SURVIVAL },
          data: {
            value: +updateCreatureDto.skills.wisdom.survival.value,
            mastery: updateCreatureDto.skills.wisdom.survival.mastery,
          },
        },
        {
          where: { skill: Skill.DECEPTION },
          data: {
            value: +updateCreatureDto.skills.charisma.deception.value,
            mastery: updateCreatureDto.skills.charisma.deception.mastery,
          },
        },
        {
          where: { skill: Skill.INTIMIDATION },
          data: {
            value: +updateCreatureDto.skills.charisma.intimidation.value,
            mastery: updateCreatureDto.skills.charisma.intimidation.mastery,
          },
        },
        {
          where: { skill: Skill.PERFORMANCE },
          data: {
            value: +updateCreatureDto.skills.charisma.performance.value,
            mastery: updateCreatureDto.skills.charisma.performance.mastery,
          },
        },
        {
          where: { skill: Skill.PERSUASION },
          data: {
            value: +updateCreatureDto.skills.charisma.persuasion.value,
            mastery: updateCreatureDto.skills.charisma.persuasion.mastery,
          },
        },
      ];

      await this.prisma.creature.update({
        where: { id: id },
        data: {
          skills: {
            upsert: {
              where: { id: id },

              create: {
                skills: {
                  createMany: {
                    data: skillsData.map((s) => ({ ...s.data, ...s.where })),
                  },
                },
              },
              update: {
                skills: {
                  updateMany: skillsData,
                },
              },
            },
          },
        },
      });
    }

    updates.biomes_relation = {
      set: [
        ...(updateCreatureDto.biome_relation?.map((biome) => ({
          name: biome.name,
        })) ?? []),
        ...(updateCreatureDto.biomes_ids?.map((id) => ({ id })) ?? []),
      ],
    };

    updates.languages_relation = {
      set: [
        ...(updateCreatureDto?.languages ?? []).map((item) => ({
          name: item.name,
        })),
        ...(updateCreatureDto.languages_ids ?? []).map((id) => ({ id })),
      ],
    };

    updates.immunities = {
      set: [
        ...(updateCreatureDto.immunities ?? []).map((item) => ({
          name: item.name,
        })),
        ...(updateCreatureDto.immunities_ids ?? []).map((id) => ({ id })),
      ],
    };

    updates.vulnerabilities = {
      set: [
        ...(updateCreatureDto?.vulnerabilities ?? []).map((item) => ({
          name: item.name,
        })),
        ...(updateCreatureDto?.vulnerabilities_ids ?? []).map((id) => ({ id })),
      ],
    };

    updates.resistances = {
      set: [
        ...(updateCreatureDto?.resistances ?? []).map((item) => ({
          name: item.name,
        })),
        ...(updateCreatureDto.resistances_ids ?? []).map((id) => ({ id })),
      ],
    };

    if ('actions_ids' in updateCreatureDto) {
      updates.actions_relation = {
        set: (updateCreatureDto.actions_ids ?? []).map((id) => ({ id })),
      };
    }

    if ('traits_ids' in updateCreatureDto) {
      updates.traits_relation = {
        set: (updateCreatureDto.traits_ids ?? []).map((id) => ({ id })),
      };
    }

    if (Object.keys(updates).length > 0) {
      await this.prisma.creature.update({
        where: { id },
        data: updates,
      });
    }

    return this.selectCreatureForCard(id);
  }

  private async mapCreatureToApiCreature(creatureRaw): Promise<ApiCreature> {
    const metadata = await this.prisma.skillMetadata.findMany();

    const creature: ApiCreature = {
      id: creatureRaw.id,
      name: creatureRaw.name,
      description: creatureRaw.description,
      alignment_id: creatureRaw.alignment_relation?.id ?? null,
      alignment_name: creatureRaw.alignment_relation?.name ?? null,
      size_id: creatureRaw.size_relation?.id ?? null,
      size_name: creatureRaw.size_relation?.name ?? null,
      type_id: creatureRaw.type_relation?.id ?? null,
      type_name: creatureRaw.type_relation?.name ?? null,
      armor_class: creatureRaw.armor_class,
      armor_type_id: null, // TODO
      armor_type_name: null, // TODO
      biomes_ids: creatureRaw.biomes_relation.map((b) => b.id),
      biomes: creatureRaw.biomes_relation,
      challenge_rating: creatureRaw.challenge_rating,
      hit_points: creatureRaw.hit_points,
      generation_info: creatureRaw.gpt_request_relation ?? null,
      languages: creatureRaw.languages_relation ?? [],
      languages_ids: creatureRaw.languages_relation?.map((l) => l.id) ?? [],
      immunities: creatureRaw.immunities ?? [],
      immunities_ids: creatureRaw.immunities?.map((i) => i.id) ?? [],
      resistances: creatureRaw.resistances ?? [],
      resistances_ids: creatureRaw.resistances?.map((r) => r.id) ?? [],
      vulnerabilities: creatureRaw.vulnerabilities ?? [],
      vulnerabilities_ids: creatureRaw.vulnerabilities?.map((v) => v.id) ?? [],
      senses: creatureRaw.senses ?? nullSensesObject,
      skills: mapAbilitiesToApiSkills(metadata, creatureRaw.skills?.skills),
      stats: mapAbilitiesToApiStats(creatureRaw.stats?.stats),
      speed: creatureRaw.speed ?? nullSpeedObject,
      traits: creatureRaw.traits_relation ?? [],
      actions: creatureRaw.actions_relation ?? [],
    };

    return creature;
  }

  private async selectCreatureForCard(
    creatureId: string,
  ): Promise<ApiCreature> {
    const creature = await this.prisma.creature.findUnique({
      where: { id: creatureId },
      select: creatureInclude,
    });

    if (!creature)
      throw new AppError({
        statusCode: HttpStatus.NOT_FOUND,
        errorText: `Creature not found: ${creatureId}`,
      });

    return this.mapCreatureToApiCreature(creature);
  }

  remove(id: number) {
    return `This action removes a #${id} creature`;
  }
}
