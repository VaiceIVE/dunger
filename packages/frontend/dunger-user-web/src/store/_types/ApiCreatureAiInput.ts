export enum ApiCreatureRole {
  OFFENCE = 'OFFENCE',
  DEFENCE = 'DEFENCE'
}

export interface ApiCreatureAiInput {
  name: string;
  challenge_rating: string;
  type: string;
  creation_description?: string | null;
  role?: ApiCreatureRole | null;
}
