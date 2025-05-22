import { Module } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { MagicItemsController } from './magic-items.controller';
import { ConfigModule } from '@nestjs/config';
import { PrismaClient } from '@dunger/prisma';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [MagicItemsController],
  providers: [MagicItemsService, PrismaClient],
})
export class MagicItemsModule {}
