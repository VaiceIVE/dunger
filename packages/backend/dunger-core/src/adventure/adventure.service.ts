import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@dunger/prisma';
import { CreateAdventureDto } from './dto/create-adventure.dto';
import { UpdateAdventureDto } from './dto/update-adventure.dto';
import { AppError } from 'src/common/errors';
import { HttpStatus } from '@dunger/common-enums';
import {
  ApiPaginatedResult,
  PaginationQueryDto,
  ApiAdventure,
  ApiAdventureList,
} from 'src/common/dto';

@Injectable()
export class AdventureService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(
    dto: CreateAdventureDto,
    creatorId: string,
  ): Promise<{ id: string }> {
    return this.prisma.adventure.create({
      data: {
        name: dto.name,
        genre_id: dto.genre_id,
        creator_id: creatorId,

        keywords: dto.keyword_ids
          ? {
              connect: dto.keyword_ids.map((id) => ({ id })),
            }
          : null,
      },
      select: {
        id: true,
      },
    });
  }

  async findAll(
    query: PaginationQueryDto,
    creatorId: string,
  ): Promise<{ adventures: ApiAdventureList } & ApiPaginatedResult> {
    const { query: searchQuery, offset, limit } = query;

    const where = searchQuery
      ? { name: { contains: searchQuery, creator_id: creatorId } }
      : { creator_id: creatorId };

    const [adventuresRaw, totalCount] = await Promise.all([
      this.prisma.adventure.findMany({
        select: {
          genre: { omit: { id: true } },
          keywords: { omit: { id: true, genre_id: true } },
          name: true,
          id: true,
        },
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.adventure.count({ where }),
    ]);

    const adventures: ApiAdventureList = adventuresRaw.map(
      ({ genre, ...a }) => ({
        ...a,
        keywords: a.keywords.map((k) => k.name),
        genre_name: genre.name,
      }),
    );

    return {
      pagination: {
        limit,
        offset,
        totalCount,
      },
      adventures,
    };
  }

  async findOne(id: string, creatorId: string): Promise<ApiAdventure> {
    const adventureRaw = await this.prisma.adventure.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        genre: true,
        keywords: true,
        created_at: true,
        updated_at: true,
        creator_id: true,
      },
    });

    if (!adventureRaw)
      throw new AppError({
        errorText: 'Adventure not found',
        statusCode: HttpStatus.NOT_FOUND,
      });

    const { creator_id, ...rest } = adventureRaw;

    if (creator_id !== creatorId)
      throw new AppError({
        errorText: 'Access denied',
        statusCode: HttpStatus.FORBIDDEN,
      });

    return rest;
  }

  async update(id: string, dto: UpdateAdventureDto, creatorId: string) {
    const existing = await this.findOne(id, creatorId);

    return this.prisma.adventure.update({
      where: { id },
      data: {
        name: dto.name ?? existing.name,
        genre_id: dto.genre_id ?? existing.genre.id,

        keywords: dto.keyword_ids
          ? {
              set: dto.keyword_ids.map((id) => ({ id })),
            }
          : null,
      },
      include: {
        genre: true,
        keywords: true,
      },
    });
  }

  async remove(id: string, creatorId: string) {
    await this.findOne(id, creatorId); // проверка на доступ

    return this.prisma.adventure.delete({
      where: { id },
    });
  }
}
