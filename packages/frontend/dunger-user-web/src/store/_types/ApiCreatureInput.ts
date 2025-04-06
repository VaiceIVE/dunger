import { ApiSenses } from './ApiSenses';
import { ApiSkillsInput } from './ApiSkillsInput';
import { ApiSpeedStat } from './ApiSpeedStat';
import { ApiStatsInput } from './ApiStatsInput';

export interface ApiCreatureInput {
  id: string;
  // Общая информация
  name: string;
  description: string | null;
  type_id: number | null;
  alignment_id: string | null;
  size_id: string | null;
  speed: ApiSpeedStat;
  languages_ids: string[];
  biomes_ids: string[];
  senses: ApiSenses;
  // Статблок
  hit_points: number;
  challenge_rating: string;
  stats: ApiStatsInput;
  armor_type_id: number | null;
  skills: ApiSkillsInput;
  resistances_ids: string[];
  immunities_ids: string[];
  vunlerabilities_ids: string[];
  // Действия
  actions_ids: string[];
  // Способности и свойства
  traits_ids: string[];
}
