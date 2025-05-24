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
      cost: rarity_relation.cost,
      type_name: type_relation.name,
      rarity_name:
        type_relation.gender === Gender.HE
          ? rarity_relation.name_he
          : type_relation.gender === Gender.SHE
            ? rarity_relation.name_she
            : rarity_relation.name_it,
      attunements: attunements_relation.map((a) => a.attunement.name),
    };

    return magicItem;
  }
}
