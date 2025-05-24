import {
  Action,
  CreatureSkills,
  CreatureSpeed,
  CreatureStats,
  Trait,
} from '@dunger/prisma';

export class FullCreatureDTO {
  name: string;
  description: string;
  speed: Omit<CreatureSpeed, 'id'>;
  stats: CreatureStats;
  hit_points: number;
  armor_class: number;
  challenge_rating: string;
  skills?: CreatureSkills;
  passive_perception: number;
  alignment_name: string;
  size_key: SizeKey;
  creature_type?: string;
  immunities?: string[];
  resistances?: string[];
  vulnerabilities?: string[];
  languages?: string[];
  actions?: Action[];
  traits?: Trait[];
  biome_name?: string;
  creature_race?: string;
}

export enum SizeKey {
  T = 'T',
  S = 'S',
  M = 'M',
  L = 'L',
  H = 'H',
  G = 'G',
}
