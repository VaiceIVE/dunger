import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@dunger/prisma';
import { CreateAdventureDto } from './dto/create-adventure.dto';
import { UpdateAdventureDto } from './dto/update-adventure.dto';
import { AppError } from 'src/common/errors';
import { HttpStatus } from '@dunger/common-enums';
import {
  PaginationQueryDto,
  ApiAdventure,
  ApiAdventureList,
  ApiAdventureListResult,
} from 'src/common/dto';
import { CreaturesService } from 'src/creatures/creatures.service';

@Injectable()
export class AdventureService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly creaturesService: CreaturesService,
  ) {}

  async create(
    dto: CreateAdventureDto,
    userId: string,
  ): Promise<{ id: string }> {
    return this.prisma.adventure.create({
      data: {
        name: dto.name,
        genre_id: dto.genre_id,
        creator_id: userId,

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
    userId: string,
  ): Promise<ApiAdventureListResult> {
    const { query: searchQuery, offset, limit } = query;

    const where = searchQuery
      ? { name: { contains: searchQuery }, creator_id: userId }
      : { creator_id: userId };

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

    const creaturesCount =
      await this.creaturesService.countUserCreatures(userId);

    return {
      pagination: {
        limit,
        offset,
        totalCount,
      },
      adventures,
      workshopMaterials: {
        creaturesCount,
      },
    };
  }

  async findOne(id: string, userId: string): Promise<ApiAdventure> {
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

    if (creator_id !== userId)
      throw new AppError({
        errorText: 'Access denied',
        statusCode: HttpStatus.FORBIDDEN,
      });

    return rest;
  }

  async update(id: string, dto: UpdateAdventureDto, userId: string) {
    const existing = await this.findOne(id, userId);

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

  async remove(id: string, userId: string) {
    await this.findOne(id, userId); // проверка на доступ

    return this.prisma.adventure.delete({
      where: { id },
    });
  }
}
