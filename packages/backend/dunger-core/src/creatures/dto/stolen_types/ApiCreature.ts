import { ApiAction } from './ApiAction';
import { ApiBiomes } from './ApiBiomes';
import { ApiCreatureAiInput } from './ApiCreatureAiInput';
import { ApiDamageType } from './ApiDamageType';
import { ApiLanguages } from './ApiLanguages';
import { ApiSenses } from './ApiSenses';
import { ApiSkills } from './ApiSkills';
import { ApiSpeedStat } from './ApiSpeedStat';
import { ApiStats } from './ApiStats';
import { ApiTrait } from './ApiTrait';

/**
 * TODO:
 * имунит к состояниям
 * трейты от типа/рассы
 * картинка
 * источник
 */
export interface ApiCreature {
  id: string;
  generation_info: ApiCreatureAiInput | null;
  // Общая информация
  name: string;   
  //image_uri: string | null;
  description: string | null;
  type_id: number | null;
  type_name: string | null;
  alignment_id: number | null;
  alignment_name: string | null;
  size_id: string | null;
  size_name: string | null;
  speed: ApiSpeedStat;
  languages_ids: number[];
  languages: ApiLanguages[];
  biomes_ids: number[];
  biomes: ApiBiomes[];
  senses: ApiSenses;
  //soirce_id: null;
  // Статблок
  hit_points: number | null;
  challenge_rating: string;
  stats: ApiStats;
  armor_type_id: number | null;
  armor_type_name: string | null;
  armor_class: number | null;
  skills: ApiSkills;
  resistances_ids: string[];
  immunities_ids: string[];
  vulnerabilities_ids: string[];
  resistances: ApiDamageType[];
  immunities: ApiDamageType[];
  vulnerabilities: ApiDamageType[];
  // Действия
  actions: ApiAction[];
  // Способности и свойства
  traits: ApiTrait[];
  //s_type: null;
  //aSubTypes: [];
}


