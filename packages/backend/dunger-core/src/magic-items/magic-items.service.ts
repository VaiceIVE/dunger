import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@dunger/prisma';
import { PaginationQueryDto } from 'src/common/dto';

@Injectable()
export class MagicItemsService {
  constructor(private readonly prisma: PrismaClient) {}
}
