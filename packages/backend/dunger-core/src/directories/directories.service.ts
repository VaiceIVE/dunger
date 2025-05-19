import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@dunger/prisma';
import { PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class DirectoriesService {
  constructor(private readonly prisma: PrismaClient) {}

  async findTypes() {
    return await this.prisma.type.findMany({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async findAlignment() {
    return await this.prisma.alignment.findMany();
  }

  async findSizes() {
    return await this.prisma.size.findMany();
  }

  async findBiomes() {
    return await this.prisma.biome.findMany();
  }

  async findDamageType() {
    return await this.prisma.damageType.findMany();
  }

  async findCR() {
    return await this.prisma.challengeRating.findMany();
  }

  async findSkills() {
    return await this.prisma.skillsList.findMany();
  }

  async findLanguages(query: PaginationQueryDto) {
    const { query: searchQuery, offset, limit } = query;

    const where = searchQuery ? { name: { contains: searchQuery } } : undefined;

    const [results, totalCount] = await Promise.all([
      this.prisma.language.findMany({
        select: { id: true, name: true },
        where,
        skip: offset,
        take: limit,
      }),
      this.prisma.language.count({ where }),
    ]);

    return {
      pagination: {
        limit,
        offset,
        totalCount,
      },
      results,
    };
  }

  async findGenres() {
    return await this.prisma.genre.findMany();
  }

  async findKeywords() {
    return await this.prisma.keyword.findMany();
  }
}
