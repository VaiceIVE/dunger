import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from 'src/creatures/creatures.module';
import { PrismaClient } from '@prisma/client';

@Module({
  imports: [CreaturesModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
