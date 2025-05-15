import { Module } from '@nestjs/common';
import { AdventureService } from './adventure.service';
import { AdventureController } from './adventure.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@dunger/prisma';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AdventureController],
  providers: [AdventureService, PrismaClient],
})
export class AdventureModule {}
