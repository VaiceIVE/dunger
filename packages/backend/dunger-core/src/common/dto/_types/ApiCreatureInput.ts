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
  alignment_id: number | null;
  size_id: string | null;
  speed: ApiSpeedStat;
  languages_ids: number[];
  languages?: { name: string }[];
  biomes_ids: number[];
  senses: ApiSenses;
  // Статблок
  hit_points: number;
  challenge_rating: string;
  stats: ApiStatsInput;
  armor_type_id: number | null;
  skills: ApiSkillsInput;
  resistances_ids: string[];
  immunities_ids: string[];
  vulnerabilities_ids: string[];
  alignment_relation?: { name: string };
  type_relation?: { name: string };
  size_relation?: { name: string };
  biome_relation?: { title: string }[];
  // Действия
  actions_ids: number[];
  // Способности и свойства
  traits_ids: number[];
}
