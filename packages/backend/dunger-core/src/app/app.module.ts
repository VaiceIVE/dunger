import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from 'src/creatures/creatures.module';
import { PrismaClient } from '@dunger/prisma';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { DirectoriesModule } from 'src/directories/directories.module';
import { AdventuresModule } from 'src/adventures/adventures.module';

@Module({
  imports: [
    CreaturesModule,
    AuthModule,
    UserModule,
    DirectoriesModule,
    AdventuresModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
