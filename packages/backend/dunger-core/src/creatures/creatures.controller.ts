import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import { ApiCreatureInput } from './dto/stolen_types/ApiCreatureInput';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { PaginationQueryDto } from 'src/common/dto';

@Controller('creatures')
export class CreaturesController {
  constructor(
    private readonly creaturesService: CreaturesService,
    private readonly configService: ConfigService,
  ) {}

  @Post('/init')
  initCreature(@Body() createCreatureDto: CreateCreatureManualDto) {
    return this.creaturesService.initCreature(createCreatureDto);
  }

  @Post('/generate')
  async generateCreature(@Body() createCreatureDto: CreateCreatureManualDto) {
    const creatureId =
      await this.creaturesService.initCreature(createCreatureDto);

    const aiCretureData = (
      await axios.post(
        `${this.configService.get('GPT_BASE_URL')}/gpt/generate/creature`,
        createCreatureDto,
      )
    ).data;

    console.log(aiCretureData);

    const updatedCreature = await this.creaturesService.update(
      creatureId.id,
      aiCretureData,
    );

    // return updatedCreature.id
    return aiCretureData;
  }

  @Post('/generate/debug')
  async generateCreatureDebug(
    @Body() createCreatureDto: CreateCreatureManualDto,
  ) {
    const creatureId =
      await this.creaturesService.initCreature(createCreatureDto);

    const aiCretureData = (
      await axios.post(
        `${this.configService.get('GPT_BASE_URL')}/gpt/generate/creature/debug`,
        createCreatureDto,
      )
    ).data;

    console.log(aiCretureData);

    const updatedCreature = await this.creaturesService.update(
      creatureId.id,
      aiCretureData.creatureData,
    );

    // return updatedCreature.id
    return { aiCretureData };
  }

  @Get()
  async findSome(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.creaturesService.findSome(query);
  }

  @Get('/templates')
  async findTemplates(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.creaturesService.findTemplates(query);
  }

  @Get('/actions/groups')
  async findActionsGroups(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.creaturesService.findActionsGroups(query);
  }

  @Get('/actions/groups/:groupId')
  async findActionsGroup(@Param('groupId') groupName: string) {
    return await this.creaturesService.findActionsGroup(groupName);
  }

  @Get('/traits/groups/')
  async findTraitsGroups(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.creaturesService.findTraitsGroups(query);
  }

  @Get('/traits/groups/:groupId')
  async findTraitsGroup(@Param('groupId') groupName: string) {
    return await this.creaturesService.findTraitsGroup(groupName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creaturesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatureDto: ApiCreatureInput) {
    return this.creaturesService.update(id, updateCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creaturesService.remove(+id);
  }
}
