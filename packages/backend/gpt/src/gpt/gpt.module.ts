import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { ChatGptService } from './openAi-gpt.servce';
import { OpenAiModule } from './Open-AI/OpenAi.module';

@Module({
  imports: [OpenAiModule],
  providers: [ChatGptService],
  controllers: [GptController],
})
export class GptModule {}
