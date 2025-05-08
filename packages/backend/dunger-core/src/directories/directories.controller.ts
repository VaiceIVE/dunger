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
    return await this.directoriesService.findBimes();
  }

  /**
   * GET, Получение навыков
   */
  @Get('/skills')
  async findSkills() {
    return await this.directoriesService.findSkills();
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
}
