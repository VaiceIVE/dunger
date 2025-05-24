import { IsString, IsUUID, IsInt, IsArray } from 'class-validator';

export class CreateAdventureDto {
  @IsString()
  name: string;

  @IsUUID()
  genre_id: string;

  @IsArray()
  @IsUUID('all', { each: true })
  keyword_ids: string[];
}
