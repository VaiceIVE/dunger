export interface ApiCreatureAiInput {
  name: string;
  danger_class: string;
  type: string;
  creation_description?: string | null;
  role?: 'OFFENCE' | 'DEFENCE';
}
