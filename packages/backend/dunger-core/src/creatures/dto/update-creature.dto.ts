import { PartialType } from '@nestjs/mapped-types';
import { FullCreatureDTO } from './createFullCreature.dto';

export class UpdateCreatureDto extends PartialType(FullCreatureDTO) {}
