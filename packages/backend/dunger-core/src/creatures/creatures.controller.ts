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
  UseGuards,
} from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ApiCreatureInput, PaginationQueryDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('creatures')
export class CreaturesController {
  constructor(
    private readonly creaturesService: CreaturesService,
    private readonly configService: ConfigService,
  ) {}

  /**
   * POST, Создает существо вручную
   *
   * Получает данные для создания из body и данные о пользователе из JWT payload
   */
  @UseGuards(JwtAuthGuard)
  @Post('/init')
  initCreature(
    @Body() createCreatureDto: CreateCreatureManualDto,
    @CurrentUser() user,
  ) {
    return this.creaturesService.initCreature(createCreatureDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/generate')
  async generateCreature(
    @Body() createCreatureDto: CreateCreatureManualDto,
    @CurrentUser() user,
  ) {
    const creatureId = await this.creaturesService.initCreature(
      createCreatureDto,
      "asd"
      // user.id,
    );

    const aiCretureData = (
      await axios.post(
        `${this.configService.get('GPT_BASE_URL')}/gpt/generate/creature`,
        createCreatureDto,
      )
    ).data;

    const updatedCreature = await this.creaturesService.update(
      creatureId.id,
      aiCretureData,
    );

    return updatedCreature.id
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/generate/debug')
  async generateCreatureDebug(
    @Body() createCreatureDto: CreateCreatureManualDto
    // @CurrentUser() user,
  ) {
    const creatureId = await this.creaturesService.initCreature(
      createCreatureDto,
      "asd"
      // user.id,
    );

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

    return { aiCretureData, creatureId };
  }

  /**
   * GET, Получение списка существ из бестиария игры
   */
  @Get()
  async findAllPublic(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.creaturesService.findAllPublic(query);
  }

  /**
   * GET, Получение списка существ, созданных пользователем
   */
  @UseGuards(JwtAuthGuard)
  @Get('user')
  async findAllUser(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
    @CurrentUser() user,
  ) {
    return await this.creaturesService.findAllUser(query, user.id);
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
