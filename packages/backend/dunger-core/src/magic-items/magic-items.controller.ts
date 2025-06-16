import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { PaginationQueryDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { CreateMagicItemDto } from './dto/create-magic-item.dto';
import { UpdateMagicItemDto } from './dto/update-magic-item.dto';
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt.guard';

@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}

  /**
   * POST, Создание магического предмета
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async initMagicItem(
    @Body() createMagicItemDto: CreateMagicItemDto,
    @CurrentUser() user,
  ) {
    return this.magicItemsService.initMagicItem(createMagicItemDto, user.id);
  }

  /**
   * PATCH, Обновление магического предмета
   */
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateMagicItem(
    @Param('id') id: string,
    @Body() updateMagicItemDto: UpdateMagicItemDto,
    @CurrentUser() user,
  ) {
    return this.magicItemsService.updateMagicItem(
      id,
      updateMagicItemDto,
      user.id,
    );
  }

  /**
   * GET, Получение списка магических предметов из книг
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
    return await this.magicItemsService.findAllPublic(query);
  }

  /**
   * GET, Получение списка магических предметов, созданных пользователем
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
    return await this.magicItemsService.findAllUser(query, user.id);
  }

  @UseGuards(OptionalJwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.magicItemsService.findOne(id, user.id);
  }
}
