import { Controller, Get, Query, ValidationPipe } from '@nestjs/common';
import { MagicItemsService } from './magic-items.service';
import { PaginationQueryDto } from 'src/common/dto';

@Controller('magic-items')
export class MagicItemsController {
  constructor(private readonly magicItemsService: MagicItemsService) {}
}
