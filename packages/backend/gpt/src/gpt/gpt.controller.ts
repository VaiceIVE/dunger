import { Body, Controller, Inject } from '@nestjs/common';

import { ChatGptService } from './openAi-gpt.servce';

@Controller()
export class GptController {
  constructor(
    private readonly chatGptService: ChatGptService,
  ) {}

 

}
