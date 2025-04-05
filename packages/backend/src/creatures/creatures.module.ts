import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { PrismaClient } from '@prisma/client';

@Module({
  controllers: [CreaturesController],
  providers: [CreaturesService, PrismaClient],
})
export class CreaturesModule {}
