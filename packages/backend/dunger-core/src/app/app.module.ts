import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreaturesModule } from 'src/creatures/creatures.module';
import { PrismaClient } from '@dunger/prisma';
import { AuthModule } from 'src/auth/auth.module';
import { UserModule } from 'src/user/user.module';
import { DirectoriesModule } from 'src/directories/directories.module';
import { AdventuresModule } from 'src/adventures/adventures.module';
import { MagicItemsModule } from 'src/magic-items/magic-items.module';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    CreaturesModule,
    AuthModule,
    UserModule,
    DirectoriesModule,
    AdventuresModule,
    MagicItemsModule,
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaClient],
})
export class AppModule {}
