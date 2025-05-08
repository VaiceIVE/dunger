import { Module } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { DirectoriesController } from './directories.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DirectoriesController],
  providers: [DirectoriesService, PrismaClient],
})
export class DirectoriesModule {}
