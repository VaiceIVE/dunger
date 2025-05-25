import { Injectable } from '@nestjs/common';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import { Prisma, PrismaClient } from '@dunger/prisma';
import { nullSkillsObject } from './objects/nullSkills.object';
import { nullSpeedObject } from './objects/nullSpeed.object';
import { nullStatObject } from './objects/nullStat.object';
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

/**
 * Фильтры SQL запроса существ
 */
type CreaturesFilterArgs = {
  userId?: string;
  excludeSourceId?: number;
  searchName?: string;
  limit: number;
  offset: number;
};

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
    // const customSourceId = (
    //   await this.prisma.source.findUnique({
    //     where: { short_name: this.customContentSource },
    //     select: { id: true },
    //   })
    // )?.id;

    const creatureData = {
      name,
      challenge_rating,
      // source_id: customSourceId,
      // creator_id: userId,
    };

    // Если указан шаблон — копируем все поля, кроме id, и переопределяем имя/CR/source
    // if (template_id) {
    //   const template = await this.prisma.creature.findUnique({
    //     where: { id: template_id },
    //   });

    //   if (template) {
    //     const { id: _, ...templateData } = template;
    //     return this.prisma.creature.create({
    //       data: { ...templateData, ...creatureData },
    //       select: { id: true },
    //     });
    //   }
    // }

    // Если шаблона нет — создаём существо с переданными полями
    return this.prisma.creature.create({
      data: creatureData,
      select: { id: true },
    });
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
      ...(search ? { name: { contains: search } } : {}),
      ...(excludeSourceId ? { source_id: { not: excludeSourceId } } : {}),
    };

    const [creaturesRaw, totalCount] = await Promise.all([
      this.prisma.$queryRaw<
        Array<{
          id: string;
          name: string;
          challenge_rating: string;
          type_name: string;
          alignment_name: string;
        }>
      >(
        this.sql_queryCreatures({
          limit,
          offset,
          searchName: search,
          excludeSourceId,
        }),
      ),
      this.prisma.creature.count({ where }),
    ]);

    return {
      pagination: { limit, offset, totalCount },
      creatures: creaturesRaw,
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
      ...(search ? { name: { contains: search } } : {}),
      creator_id: userId,
    };

    const [creaturesRaw, totalCount] = await Promise.all([
      this.prisma.$queryRaw<
        Array<{
          id: string;
          name: string;
          challenge_rating: string;
          type_name: string;
          alignment_name: string;
        }>
      >(
        this.sql_queryCreatures({
          limit,
          offset,
          searchName: search,
          userId,
        }),
      ),
      this.prisma.creature.count({ where }),
    ]);

    return {
      pagination: { limit, offset, totalCount },
      creatures: creaturesRaw,
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
      ...(search ? { name: { contains: search } } : {}),
      creator_id: userId,
    };

    return this.prisma.creature.count({ where });
  }

  private sql_queryCreatures = (args: CreaturesFilterArgs): Prisma.Sql => {
    const likePattern = `%${args.searchName ?? ''}%`;
    const offset = Number(args.offset ?? 0);
    const limit = Number(args.limit ?? 20);

    return Prisma.sql`
      SELECT 
        c.id, 
        c.name, 
        c.challenge_rating, 
        t.name AS type_name, 
        a.name AS alignment_name
      FROM "Creature" c
      LEFT JOIN "Type" t ON c.type_id = t.id
      LEFT JOIN "Alignment" a ON c.alignment_id = a.id
      WHERE True
      ${args.userId ? Prisma.sql`AND c.creator_id = ${args.userId}` : Prisma.sql``}
      ${args.excludeSourceId ? Prisma.sql`AND c.source_id != ${args.excludeSourceId}` : Prisma.sql``}
      ${args.searchName ? Prisma.sql`AND c.name ILIKE ${likePattern}` : Prisma.sql``}
      ORDER BY 
        CASE c.challenge_rating
          WHEN '0' THEN 0
          WHEN '1/8' THEN 0.125
          WHEN '1/4' THEN 0.25
          WHEN '1/2' THEN 0.5
          ELSE CAST(c.challenge_rating AS DOUBLE PRECISION)
        END,
        c.id
      OFFSET ${offset}
      LIMIT ${limit};
    `;
  };

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

  private cleanObj(obj) {
    var newobj = {};
    const complexPropnames = [
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
      'race_relation',
    ];
    for (var propname in obj) {
      if (
        !(
          obj[propname] === null ||
          obj[propname] === undefined ||
          complexPropnames.includes(propname)
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
    if (updateCreatureDto.size_id) {
      await this.prisma.creature.update({
        where: {
          id: id,
        },
        data: {
          size_relation: {
            connect: {
              id: updateCreatureDto.size_id,
            },
          },
        },
      });
    }
    if (updateCreatureDto.senses) {
      await this.prisma.creature.update({
        where: { id: id },
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
    if (updateCreatureDto.alignment_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          alignment_relation: {
            connect: {
              name: updateCreatureDto.alignment_relation.name.toLowerCase(),
            },
          },
        },
      });
    }
    if (updateCreatureDto.type_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          type_relation: {
            connect: {
              name: updateCreatureDto.type_relation.name.toLowerCase(),
            },
          },
        },
      });
    }
    if (updateCreatureDto.size_relation) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          size_relation: {
            connect: {
              id: updateCreatureDto.size_relation.name,
            },
          },
        },
      });
    }
    if (updateCreatureDto.biome_relation) {
      for (const biome of updateCreatureDto.biome_relation) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            biome_relation: {
              connect: {
                name: biome.title,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.biomes_ids) {
      for (const biome_id of updateCreatureDto.biomes_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            biome_relation: {
              connect: {
                id: biome_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.languages) {
      for (const lang of updateCreatureDto.languages) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            languages: {
              set: [],
              connectOrCreate: {
                create: {
                  name: lang.name,
                },
                where: {
                  name: lang.name,
                },
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.speed) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          speed: {
            upsert: {
              where: {
                id_relation: {
                  id: id,
                },
              },
              create: updateCreatureDto.speed,
              update: this.cleanObj(updateCreatureDto.speed),
            },
          },
        },
      });
    }
    if (updateCreatureDto.stats) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          stats: {
            upsert: {
              where: { id: id },
              create: {
                strength: {
                  create: {
                    mastery: updateCreatureDto.stats.strength.mastery,
                    value: updateCreatureDto.stats.strength.value,
                  },
                },
                dexterity: {
                  create: {
                    mastery: updateCreatureDto.stats.dexterity.mastery,
                    value: updateCreatureDto.stats.dexterity.value,
                  },
                },
                constitution: {
                  create: {
                    mastery: updateCreatureDto.stats.constitution.mastery,
                    value: updateCreatureDto.stats.constitution.value,
                  },
                },
                intelligence: {
                  create: {
                    mastery: updateCreatureDto.stats.intelligence.mastery,
                    value: updateCreatureDto.stats.intelligence.value,
                  },
                },
                wisdom: {
                  create: {
                    mastery: updateCreatureDto.stats.wisdom.mastery,
                    value: updateCreatureDto.stats.wisdom.value,
                  },
                },
                charisma: {
                  create: {
                    mastery: updateCreatureDto.stats.charisma.mastery,
                    value: updateCreatureDto.stats.charisma.value,
                  },
                },
              },
              update: {
                strength: {
                  update: {
                    mastery: updateCreatureDto.stats.strength.mastery,
                    value: updateCreatureDto.stats.strength.value,
                  },
                },
                dexterity: {
                  update: {
                    mastery: updateCreatureDto.stats.dexterity.mastery,
                    value: updateCreatureDto.stats.dexterity.value,
                  },
                },
                constitution: {
                  update: {
                    mastery: updateCreatureDto.stats.constitution.mastery,
                    value: updateCreatureDto.stats.constitution.value,
                  },
                },
                intelligence: {
                  update: {
                    mastery: updateCreatureDto.stats.intelligence.mastery,
                    value: updateCreatureDto.stats.intelligence.value,
                  },
                },
                wisdom: {
                  update: {
                    mastery: updateCreatureDto.stats.wisdom.mastery,
                    value: updateCreatureDto.stats.wisdom.value,
                  },
                },
                charisma: {
                  update: {
                    mastery: updateCreatureDto.stats.charisma.mastery,
                    value: updateCreatureDto.stats.charisma.value,
                  },
                },
              },
            },
          },
        },
      });
    }
    if (updateCreatureDto.skills) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          skills: {
            upsert: {
              where: { id: id },
              create: {
                charisma: {
                  create: {
                    deception: {
                      create: updateCreatureDto.skills.charisma.deception,
                    },
                    intimidation: {
                      create: updateCreatureDto.skills.charisma.intimidation,
                    },
                    performance: {
                      create: updateCreatureDto.skills.charisma.performance,
                    },
                    persuasion: {
                      create: updateCreatureDto.skills.charisma.persuasion,
                    },
                  },
                },
                dexterity: {
                  create: {
                    acrobatics: {
                      create: updateCreatureDto.skills.dexterity.acrobatics,
                    },
                    sleight_of_hand: {
                      create:
                        updateCreatureDto.skills.dexterity.sleight_of_hand,
                    },
                    stealth: {
                      create: updateCreatureDto.skills.dexterity.stealth,
                    },
                  },
                },
                intelligence: {
                  create: {
                    arcana: {
                      create: updateCreatureDto.skills.intelligence.arcana,
                    },
                    history: {
                      create: updateCreatureDto.skills.intelligence.history,
                    },
                    investigation: {
                      create:
                        updateCreatureDto.skills.intelligence.investigation,
                    },
                    nature: {
                      create: updateCreatureDto.skills.intelligence.nature,
                    },
                    religion: {
                      create: updateCreatureDto.skills.intelligence.religion,
                    },
                  },
                },
                strength: {
                  create: {
                    athletics: {
                      create: updateCreatureDto.skills.strength.athletics,
                    },
                  },
                },
                wisdom: {
                  create: {
                    animal_handling: {
                      create: updateCreatureDto.skills.wisdom.animal_handling,
                    },
                    insight: {
                      create: updateCreatureDto.skills.wisdom.insight,
                    },
                    medicine: {
                      create: updateCreatureDto.skills.wisdom.medicine,
                    },
                    perception: {
                      create: updateCreatureDto.skills.wisdom.perception,
                    },
                    survival: {
                      create: updateCreatureDto.skills.wisdom.survival,
                    },
                  },
                },
              },
              update: {
                charisma: {
                  update: {
                    deception: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.deception,
                        update: updateCreatureDto.skills.charisma.deception,
                      },
                    },
                    intimidation: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.intimidation,
                        update: updateCreatureDto.skills.charisma.intimidation,
                      },
                    },
                    performance: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.performance,
                        update: updateCreatureDto.skills.charisma.performance,
                      },
                    },
                    persuasion: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.charisma.persuasion,
                        update: updateCreatureDto.skills.charisma.persuasion,
                      },
                    },
                  },
                },
                dexterity: {
                  update: {
                    acrobatics: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.dexterity.acrobatics,
                        update: updateCreatureDto.skills.dexterity.acrobatics,
                      },
                    },
                    sleight_of_hand: {
                      upsert: {
                        where: { id: id },
                        create:
                          updateCreatureDto.skills.dexterity.sleight_of_hand,
                        update:
                          updateCreatureDto.skills.dexterity.sleight_of_hand,
                      },
                    },
                    stealth: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.dexterity.stealth,
                        update: updateCreatureDto.skills.dexterity.stealth,
                      },
                    },
                  },
                },
                intelligence: {
                  update: {
                    arcana: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.arcana,
                        update: updateCreatureDto.skills.intelligence.arcana,
                      },
                    },
                    history: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.history,
                        update: updateCreatureDto.skills.intelligence.history,
                      },
                    },
                    investigation: {
                      upsert: {
                        where: { id: id },
                        create:
                          updateCreatureDto.skills.intelligence.investigation,
                        update:
                          updateCreatureDto.skills.intelligence.investigation,
                      },
                    },
                    nature: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.nature,
                        update: updateCreatureDto.skills.intelligence.nature,
                      },
                    },
                    religion: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.intelligence.religion,
                        update: updateCreatureDto.skills.intelligence.religion,
                      },
                    },
                  },
                },
                strength: {
                  update: {
                    athletics: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.strength.athletics,
                        update: updateCreatureDto.skills.strength.athletics,
                      },
                    },
                  },
                },
                wisdom: {
                  update: {
                    animal_handling: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.animal_handling,
                        update: updateCreatureDto.skills.wisdom.animal_handling,
                      },
                    },
                    insight: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.insight,
                        update: updateCreatureDto.skills.wisdom.insight,
                      },
                    },
                    medicine: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.medicine,
                        update: updateCreatureDto.skills.wisdom.medicine,
                      },
                    },
                    perception: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.perception,
                        update: updateCreatureDto.skills.wisdom.perception,
                      },
                    },
                    survival: {
                      upsert: {
                        where: { id: id },
                        create: updateCreatureDto.skills.wisdom.survival,
                        update: updateCreatureDto.skills.wisdom.survival,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });
    }
    if (updateCreatureDto.languages_ids) {
      await this.prisma.creature.update({
        where: {
          id: id,
        },
        data: {
          languages: {
            set: [],
          },
        },
      });
      for (var language_id of updateCreatureDto.languages_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            languages: {
              connect: {
                id: language_id,
              },
            },
          },
        });
      }
    }

    if (updateCreatureDto.resistances_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          resistances: {
            set: [],
          },
        },
      });
      for (const resistance_id of updateCreatureDto.resistances_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            resistances: {
              connect: {
                id: resistance_id,
              },
            },
          },
        });
      }
    }

    if (updateCreatureDto.immunities_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          immunities: {
            set: [],
          },
        },
      });
      for (const immunity_id of updateCreatureDto.immunities_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            immunities: {
              connect: {
                id: immunity_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.vulnerabilities_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          vulnerabilities: {
            set: [],
          },
        },
      });
      for (const vunlerability_id of updateCreatureDto.vulnerabilities_ids) {
        await this.prisma.creature.update({
          where: {
            id: id,
          },
          data: {
            vulnerabilities: {
              connect: {
                id: vunlerability_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.actions_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          actions: {
            set: [],
          },
        },
      });
      for (const action_id of updateCreatureDto.actions_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            actions: {
              connect: {
                id: action_id,
              },
            },
          },
        });
      }
    }
    if (updateCreatureDto.traits_ids) {
      await this.prisma.creature.update({
        where: { id: id },
        data: {
          traits: {
            set: [],
          },
        },
      });
      for (const trait_id of updateCreatureDto.traits_ids) {
        await this.prisma.creature.update({
          where: { id: id },
          data: {
            traits: {
              connect: {
                id: trait_id,
              },
            },
          },
        });
      }
    }
    return this.selectCreatureForCard(id);
  }

  private async mapCreatureToApiCreature(creature): Promise<ApiCreature> {
    const creature_biomes = await this.prisma.biome.findMany({
      where: { id: { in: creature.biomes_ids } },
    });

    return {
      id: creature.id,
      name: creature.name,
      description: creature.description,
      alignment_id: creature.alignment_relation?.id ?? null,
      alignment_name: creature.alignment_relation?.name ?? null,
      size_id: creature.size_relation?.id ?? null,
      size_name: creature.size_relation?.name ?? null,
      type_id: creature.type_relation?.id ?? null,
      type_name: creature.type_relation?.name ?? null,
      armor_class: creature.armor_class,
      armor_type_id: null, // TODO
      armor_type_name: null, // TODO
      biomes_ids: creature.biomes_ids,
      biomes: creature_biomes,
      challenge_rating: creature.challenge_rating,
      hit_points: creature.hit_points,
      generation_info: null,
      languages: creature.languages ?? [],
      languages_ids: creature.languages?.map((l) => l.id) ?? [],
      immunities: creature.immunities ?? [],
      immunities_ids: creature.immunities?.map((i) => i.id) ?? [],
      resistances: creature.resistances ?? [],
      resistances_ids: creature.resistances?.map((r) => r.id) ?? [],
      vulnerabilities: creature.vulnerabilities ?? [],
      vulnerabilities_ids: creature.vulnerabilities?.map((v) => v.id) ?? [],
      senses: creature.senses ?? nullSensesObject,
      skills: creature.skills ?? nullSkillsObject,
      stats: creature.stats ?? nullStatObject,
      speed: creature.speed ?? nullSpeedObject,
      traits: creature.traits ?? [],
      actions: creature.actions ?? [],
    };
  }

  private async selectCreatureForCard(
    creatureId: string,
  ): Promise<ApiCreature> {
    const creature = await this.prisma.creature.findUnique({
      where: { id: creatureId },
      include: creatureInclude,
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
