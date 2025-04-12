import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PromptService } from 'src/prompt/prompt.service';
import { GptService } from 'src/gpt/gpt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, PromptService, GptService],
})
export class AppModule {}
