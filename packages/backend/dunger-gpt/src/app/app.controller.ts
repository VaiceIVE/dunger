import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ValidationResultDTO } from 'src/dto/validationResultDTO';
import { AppService } from './app.service';
import { CreateCreatureDto } from './dto/create-creature.dto';

@Controller('/gpt')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/generate/creature')
  async createCreature(@Body() createCreatureDTO: ApiCreatureAiInput) {
    let modelResponse = await this.gptService.createCreature(createCreatureDTO);
    let validationResult: ValidationResultDTO;
    let generation_count = 0;

    while (generation_count < 5) {
      validationResult = (
        await axios.post(
          `${this.configService.get('VALIDATOR_BASE_URL')}/validate_entity`,
          { entity_json: modelResponse.result },
        )
      ).data;
      console.log(validationResult);
      if (validationResult.is_success) {
        return modelResponse.result;
      } else {
        modelResponse = await this.gptService.regenerateCreature(
          modelResponse.messages,
          validationResult.result,
        );
      }
      generation_count += 1;
    }

    return modelResponse.result;
  }

  @Post('/generate/creature/debug')
  async createCreatureDebug(@Body() createCreatureDTO: ApiCreatureAiInput) {
    let modelResponse = await this.gptService.createCreature(createCreatureDTO);
    let validationResult: ValidationResultDTO;
    let generation_count = 0;

    while (generation_count < 5) {
      validationResult = (
        await axios.post(
          `${this.configService.get('VALIDATOR_BASE_URL')}/validate_entity`,
          { entity_json: modelResponse.result },
        )
      ).data;
      console.log(validationResult);
      if (validationResult.is_success) {
        return { creatureData: modelResponse.result, validationResult };
      } else {
        modelResponse = await this.gptService.regenerateCreature(
          modelResponse.messages,
          validationResult.result,
        );
      }
      generation_count += 1;
    }

    return { creatureData: modelResponse.result, validationResult };
  }
}
