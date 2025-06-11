import { CreatureRole } from '@dunger/prisma';

export class CreateCreatureAiDto {
  name: string;
  type_name: string;
  challenge_rating: string;
  role: CreatureRole | null;
  creation_description: string | null;
}
