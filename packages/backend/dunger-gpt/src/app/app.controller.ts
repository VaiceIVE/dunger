import { Body, Controller, Post } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { CreateCreatureDto } from './dto/create-creature.dto';
import { ValidationResult } from 'src/types/ValidationResult';

@Controller('/gpt')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/generate/creature')
  async createCreature(@Body() createCreatureDTO: CreateCreatureDto) {
    let modelResponse = await this.appService.createCreature(createCreatureDTO);
    let validationResult: ValidationResult;
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
        modelResponse = await this.appService.regenerateCreature(
          modelResponse.messages,
          validationResult.result,
        );
      }
      generation_count += 1;
    }

    return modelResponse.result;
  }

  @Post('/generate/creature/debug')
  async createCreatureDebug(@Body() createCreatureDTO: CreateCreatureDto) {
    let modelResponse = await this.appService.createCreature(createCreatureDTO);
    let validationResult: ValidationResult;
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
        modelResponse = await this.appService.regenerateCreature(
          modelResponse.messages,
          validationResult.result,
        );
      }
      generation_count += 1;
    }

    return { creatureData: modelResponse.result, validationResult };
  }
}
