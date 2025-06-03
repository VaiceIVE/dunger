export enum ApiCreatureRole {
  OFFENCE = 'OFFENCE',
  DEFENCE = 'DEFENCE',
}

export class CreateCreatureDto {
  name: string;
  type_name: string;
  challenge_rating: string;
  role: ApiCreatureRole | null;
  creation_description: string | null;
}
