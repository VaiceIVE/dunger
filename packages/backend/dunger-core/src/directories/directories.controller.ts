import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { DirectoriesService } from './directories.service';
import { PaginationQueryDto } from 'src/common/dto';

@Controller('directories')
export class DirectoriesController {
  constructor(private readonly directoriesService: DirectoriesService) {}

  /**
   * GET, Получение типов существ
   */
  @Get('/types')
  async findTypes() {
    return await this.directoriesService.findTypes();
  }

  /**
   * GET, Получение мировозрений
   */
  @Get('/alignments')
  async findAlignments() {
    return this.directoriesService.findAlignment();
  }

  /**
   * GET, Получение размеров существ
   */
  @Get('/sizes')
  async findSizes() {
    return await this.directoriesService.findSizes();
  }

  /**
   * GET, Получение мест обитания
   */
  @Get('/biomes')
  async findBiomes() {
    return await this.directoriesService.findBiomes();
  }

  /**
   * GET, Получение типов урона
   */
  @Get('/damage-types')
  async findDamageTypes() {
    return await this.directoriesService.findDamageType();
  }

  /**
   * GET, Получение классов опасности
   */
  @Get('/cr')
  async findCR() {
    return await this.directoriesService.findCR();
  }

  /**
   * GET, Получение языков
   */
  @Get('/languages')
  async findLanguages(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
  ) {
    return await this.directoriesService.findLanguages(query);
  }

  /**
   * GET, Получение жанров приключений
   */
  @Get('/genres')
  async findGenres() {
    return await this.directoriesService.findGenres();
  }

  /**
   * GET, Получение ключевых слов для приключений
   */
  @Get('/keywords')
  async findKeywords() {
    return await this.directoriesService.findKeywords();
  }

  /**
   * GET, Получение возможных источников настройки для
   * магических предметов
   */
  @Get('/attunement-conditions')
  async findAttunementConditions() {
    return await this.directoriesService.findAttunementConditions();
  }

  /**
   * GET, Получение типов магических предметов
   */
  @Get('/magic-item-types')
  async findMagicItemTypes() {
    return await this.directoriesService.findMagicItemTypes();
  }

  /**
   * GET, Получение типов редкости магических предметов
   */
  @Get('/magic-item-rarities')
  async findMagicItemRarities() {
    return await this.directoriesService.findMagicItemRarities();
  }
}
