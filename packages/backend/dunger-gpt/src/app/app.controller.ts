import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatureAiInput } from 'src/dto/ApiCreatureAiInput';
import { PromptService } from 'src/prompt/prompt.service';
import { GptService } from 'src/gpt/gpt.service';

@Controller('/gpt')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly promptService: PromptService,
    private readonly gptService: GptService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/generate/creature')
  async createCreature(@Body() createCreatureDTO: ApiCreatureAiInput){
    const creatureData = await this.gptService.createCreature(createCreatureDTO)

    //validate creature, if false, retry prompt

    return creatureData
  }
}
