import { HttpStatus, Injectable } from '@nestjs/common';
import { Gender, PrismaClient } from '@dunger/prisma';
import { ApiMagicItemListResult, PaginationQueryDto } from 'src/common/dto';
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
      ...(search ? { name: { contains: search } } : {}),
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
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.magicItem.count({ where }),
    ]);

    const magicItems = magicItemsRaw.map(
      ({ type_relation, rarity_relation, ...rest }) => ({
        ...rest,
        cost: rarity_relation.cost,
        type_name:
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
  async findAllUser(query: PaginationQueryDto, userId: string) {
    const { query: search, offset, limit } = query;

    const where = {
      ...(search ? { name: { contains: search } } : {}),
      creator_id: userId,
    };

    const [magicItemsRaw, totalCount] = await Promise.all([
      this.prisma.magicItem.findMany({
        select: {
          id: true,
          name: true,
        },
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.magicItem.count({ where }),
    ]);

    return {
      pagination: { limit, offset, totalCount },
      magicItems: magicItemsRaw,
    };
  }

  async findOne(id: string) {
    const magicItem = await this.prisma.magicItem.findUnique({
      where: { id: id },
    });

    if (!magicItem)
      throw new AppError({
        statusCode: HttpStatus.NOT_FOUND,
        errorText: `MagicItem not found: ${id}`,
      });

    return magicItem;
  }
}
