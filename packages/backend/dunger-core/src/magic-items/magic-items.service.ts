import { HttpStatus, Injectable } from '@nestjs/common';
import { Gender, PrismaClient } from '@dunger/prisma';
import {
  ApiMagicItem,
  ApiMagicItemList,
  ApiMagicItemListResult,
  PaginationQueryDto,
} from 'src/common/dto';
import { ConfigService } from '@nestjs/config';
import { AppError } from 'src/common/errors';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';

@Injectable()
export class MagicItemsService {
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
   * Создаёт магический предмет.
   * Устанавливает источник как кастомный (по shortName из this.customContentSource).
   *
   * @param createMagicItemDto - Данные для создания магического предмета.
   * @param userId - id пользователя, который создает предемет.
   * @returns id созданного предмета.
   */
  async initMagicItem(createMagicItemDto: CreateMagicItemDto, userId: string) {
    // Получаем id кастомного источника (например, "DUNGER")
    const customSourceId = (
      await this.prisma.source.findUnique({
        where: { short_name: this.customContentSource },
        select: { id: true },
      })
    )?.id;

    const magicItemData = {
      name: createMagicItemDto.name,
      source_id: customSourceId,
      creator_id: userId,
    };

    return this.prisma.magicItem.create({
      data: magicItemData,
      select: { id: true },
    });
  }

  /**
   * Обновляет магический предмет.
   *
   * @param magicItemId - id редактируемого предемета.
   * @param updateMagicItemDto - Данные для создания магического предмета.
   * @param userId - id пользователя, который редактирует предемет.
   * @returns id предмета.
   */
  async updateMagicItem(
    magicItemId: string,
    updateMagicItemDto: UpdateMagicItemDto,
    userId?: string,
  ) {
    /**
     * TODO: нормальная проверка на создателя
     */
    if (!userId)
      throw new AppError({
        errorText: 'Access denied',
        statusCode: HttpStatus.FORBIDDEN,
      });

    const { attunement_ids, ...magicItemData } = updateMagicItemDto;

    await this.prisma.magicItemAttunement.deleteMany({
      where: { magicItemId },
    });

    if (attunement_ids.length) {
      await this.prisma.magicItemAttunement.createMany({
        data: attunement_ids.map((attunementId) => ({
          magicItemId,
          attunementId,
        })),
      });
    }

    return this.prisma.magicItem.update({
      where: {
        id: magicItemId,
      },
      data: {
        ...magicItemData,
      },
      select: { id: true },
    });
  }

  /**
   * Возвращает список магических предметов из книги с пагинацией и фильтрацией по имени.
   * Исключает предметы, источник которых соответствует кастомному контенту (shortName берётся из configService).
   *
   * @param query - Объект с параметрами пагинации и поиска.
   * @returns Предметы + информация о пагинации.
   */
  async findAllPublic(
    query: PaginationQueryDto,
  ): Promise<ApiMagicItemListResult> {
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

    const [magicItemsRaw, totalCount] = await Promise.all([
      this.prisma.magicItem.findMany({
        select: {
          id: true,
          name: true,
          rarity_relation: true,
          type_relation: true,
        },
        orderBy: {
          rarity_relation: {
            order: 'asc',
          },
        },
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.magicItem.count({ where }),
    ]);

    const magicItems: ApiMagicItemList = magicItemsRaw.map(
      ({ type_relation, rarity_relation, ...rest }) => ({
        ...rest,
        cost: rarity_relation.cost,
        rarity_name:
          type_relation.gender === Gender.HE
            ? rarity_relation.name_he
            : type_relation.gender === Gender.SHE
              ? rarity_relation.name_she
              : rarity_relation.name_it,
      }),
    );

    return {
      pagination: { limit, offset, totalCount },
      magicItems,
    };
  }

  /**
   * Возвращает список магических предметов, которых создал пользователь, с пагинацией и фильтрацией по имени.
   *
   * @param query - Объект с параметрами пагинации и поиска.
   * @param userId - id пользователя, который создал предметы.
   * @returns Предметы + информация о пагинации.
   */
  async findAllUser(
    query: PaginationQueryDto,
    userId: string,
  ): Promise<ApiMagicItemListResult> {
    const { query: search, offset, limit } = query;

    const where = {
      ...(search
        ? { name: { contains: search, mode: 'insensitive' as const } }
        : {}),
      creator_id: userId,
    };

    const [magicItemsRaw, totalCount] = await Promise.all([
      this.prisma.magicItem.findMany({
        select: {
          id: true,
          name: true,
          rarity_relation: true,
          type_relation: true,
        },
        orderBy: {
          rarity_relation: {
            order: 'asc',
          },
        },
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.magicItem.count({ where }),
    ]);

    const magicItems: ApiMagicItemList = magicItemsRaw.map(
      ({ type_relation, rarity_relation, ...rest }) => ({
        ...rest,
        cost: rarity_relation.cost,
        rarity_name:
          type_relation.gender === Gender.HE
            ? rarity_relation.name_he
            : type_relation.gender === Gender.SHE
              ? rarity_relation.name_she
              : rarity_relation.name_it,
      }),
    );

    return {
      pagination: { limit, offset, totalCount },
      magicItems,
    };
  }

  async findOne(id: string): Promise<ApiMagicItem> {
    const magicItemRaw = await this.prisma.magicItem.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        description: true,
        type_relation: true,
        rarity_relation: true,
        requires_attunement: true,
        attunements_relation: {
          select: {
            attunement: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!magicItemRaw)
      throw new AppError({
        statusCode: HttpStatus.NOT_FOUND,
        errorText: `MagicItem not found: ${id}`,
      });

    const { type_relation, rarity_relation, attunements_relation, ...rest } =
      magicItemRaw;

    const magicItem: ApiMagicItem = {
      ...rest,
      cost: rarity_relation?.cost ?? null,
      type: type_relation ?? null,
      rarity: !rarity_relation
        ? null
        : {
            id: rarity_relation.id,
            name:
              type_relation?.gender === Gender.HE
                ? rarity_relation.name_he
                : type_relation?.gender === Gender.SHE
                  ? rarity_relation.name_she
                  : rarity_relation.name_it,
          },
      attunements: attunements_relation?.map((a) => a.attunement) ?? [],
    };

    return magicItem;
  }
}
