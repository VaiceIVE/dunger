import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from 'src/creatures/creatures.module';
import { PrismaClient } from '@prisma/client';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CreaturesModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
