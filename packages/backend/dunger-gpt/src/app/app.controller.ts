import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiCreatureAiInput } from 'src/dto/ApiCreatureAiInput';
import { PromptService } from 'src/prompt/prompt.service';
import { GptService } from 'src/gpt/gpt.service';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';

@Controller('/gpt')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly promptService: PromptService,
    private readonly gptService: GptService,
    private readonly configService: ConfigService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/generate/creature')
  async createCreature(@Body() createCreatureDTO: ApiCreatureAiInput){
    const creatureData = await this.gptService.createCreature(createCreatureDTO)

    console.log(creatureData)

    const validationResult = (await axios.post(`${this.configService.get('VALIDATOR_BASE_URL')}/validate_entity`, {entity_json: creatureData})).data

    console.log(validationResult)



    //validate creature, if false, retry prompt

    return creatureData
  }

  @Post('/generate/creature/debug')
  async createCreatureDebug(@Body() createCreatureDTO: ApiCreatureAiInput){
    const creatureData = await this.gptService.createCreature(createCreatureDTO)

    console.log(creatureData)

    const validationResult = (await axios.post(`${this.configService.get('VALIDATOR_BASE_URL')}/validate_entity`, {entity_json: creatureData})).data

    console.log(validationResult)



    //validate creature, if false, retry prompt

    return {creatureData, validationResult}
  }
}
