import { Module } from '@nestjs/common';
import { OpenAiService } from './OpenAi.service';

@Module({
  imports: [],
  providers: [OpenAiService],
  exports: [OpenAiService],
})
export class OpenAiModule {}
