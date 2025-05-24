import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { PaginationQueryDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';

@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.magicItemsService.findOne(id);
  }
}
