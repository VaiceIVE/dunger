import { Module } from '@nestjs/common';
import { AdventuresService } from './adventures.service';
import { AdventuresController } from './adventures.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@dunger/prisma';
import { CreaturesService } from 'src/creatures/creatures.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AdventuresController],
  providers: [AdventuresService, PrismaClient, CreaturesService],
})
export class AdventuresModule {}
