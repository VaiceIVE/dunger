import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@dunger/prisma';

@Injectable()
export class AdventureService {
  constructor(private readonly prisma: PrismaClient) {}
}
