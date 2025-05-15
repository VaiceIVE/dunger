import { Controller } from '@nestjs/common';
import { AdventureService } from './adventure.service';

@Controller('adventure')
export class AdventureController {
  constructor(private readonly directoriesService: AdventureService) {}
}
