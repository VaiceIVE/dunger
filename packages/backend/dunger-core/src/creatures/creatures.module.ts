import { Module } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreaturesController } from './creatures.controller';
import { PrismaClient } from '@dunger/prisma';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [CreaturesController],
  providers: [CreaturesService, PrismaClient],
})
export class CreaturesModule {}
