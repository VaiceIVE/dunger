import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ValidationPipe } from '@nestjs/common';
import { CreaturesService } from './creatures.service';
import { CreateCreatureManualDto } from './dto/createCreatureManual.dto';
import { UpdateCreatureDto } from './dto/update-creature.dto';
import { PaginationQuery } from '../app/dto/queries/paginationQuery';
import { PaginationQureiedQuery } from 'src/app/dto/queries/paginationQueriedQuery';
import { QueryValidationPipe } from 'src/pipes/query.pipe';

@Controller('creatures')
export class CreaturesController {
  constructor(private readonly creaturesService: CreaturesService) {}

  @Post('/init')
  initCreature(@Body() createCreatureDto: CreateCreatureManualDto) {
    return this.creaturesService.initCreature(createCreatureDto);
  }

  @Get()
  findAll() {
    return this.creaturesService.findAll();
  }

  @Get('/templates')
  async findTemplates(@Query(new ValidationPipe({transform: true, transformOptions: {enableImplicitConversion: true}})) query: PaginationQureiedQuery){
    return await this.creaturesService.findTemplates(query);
  }

  @Get('/types')
  async findTypes(){
    return await this.creaturesService.findTypes()
  }

  @Get('/alignments')
  async findAlignments(){
    return this.creaturesService.findAlignment()
  }

  @Get('/sizes')
  async findSizes(){
    return await this.creaturesService.findSizes()
  }

  @Get('/biomes')
  async findBiomes(){
    return await this.creaturesService.findBimes()
  }

  @Get('/skills')
  async findSkills(){
    return await this.creaturesService.findSkills()
  }

  @Get('/damage-types')
  async findDamageTypes(){
    return await this.creaturesService.findDamageType()
  }

  @Get('/actions/groups')
  async findActionsGroups(){
    return await this.creaturesService.findActionsGroups()
  }

  @Get('/actions/groups/:groupId')
  async findActionsGroup(@Param('groupId') groupName: string){
    return await this.creaturesService.findActionsGroup(groupName)
  }

  @Get('/traits/groups/')
  async findTraitsGroups(){
    return await this.creaturesService.findTraitsGroups()
  }

  @Get('/traits/groups/:groupId')
  async findTraitsGroup(@Param('groupId') groupName: string){
    return await this.creaturesService.findTraitsGroup(groupName)
  }

  @Get('/cr')
  async findCR(){
    return await this.creaturesService.findCR()
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.creaturesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCreatureDto: UpdateCreatureDto) {
    return this.creaturesService.update(id, updateCreatureDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.creaturesService.remove(+id);
  }
}
