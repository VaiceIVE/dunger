import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AdventuresService } from './adventures.service';
import { CreateAdventureDto } from './dto/create-adventure.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UpdateAdventureDto } from './dto/update-adventure.dto';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { PaginationQueryDto } from 'src/common/dto';

@UseGuards(JwtAuthGuard)
@Controller('adventures')
export class AdventuresController {
  constructor(private readonly adventuresService: AdventuresService) {}

  @Post()
  create(@Body() dto: CreateAdventureDto, @CurrentUser() user) {
    return this.adventuresService.create(dto, user.id);
  }

  @Get()
  findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        transformOptions: { enableImplicitConversion: true },
      }),
    )
    query: PaginationQueryDto,
    @CurrentUser() user,
  ) {
    return this.adventuresService.findAll(query, user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() user) {
    return this.adventuresService.findOne(id, user.id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: UpdateAdventureDto,
    @CurrentUser() user,
  ) {
    return this.adventuresService.update(id, dto, user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() user) {
    return this.adventuresService.remove(id, user.id);
  }
}
