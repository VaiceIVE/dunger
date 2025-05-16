// Общие типы
export * from './_common';

// Типы взаимодействия с существом
export type { ApiCreature } from './ApiCreature';
export type { ApiCreatureAiInput, ApiCreatureRole } from './ApiCreatureAiInput';
export type { ApiCreatureInput } from './ApiCreatureInput';
export type { ApiCreatureList } from './ApiCreatureList';
export type { ApiCreatureManualInput } from './ApiCreatureManualInput';

export type { ApiAction } from './ApiAction';
export type { ApiSenses } from './ApiSenses';
export type { ApiSkill } from './ApiSkills';
export type { ApiSkillInput, ApiSkillsInput } from './ApiSkillsInput';
export type { ApiSpeedStat } from './ApiSpeedStat';
export type { ApiStats } from './ApiStats';
export type { ApiStatsInput } from './ApiStatsInput';
export type { ApiTrait } from './ApiTrait';

// Типы справочников
export type { ApiDamageType } from './ApiDamageType';
export type { ApiLanguages } from './ApiLanguages';
export type { ApiBiomes } from './ApiBiomes';

// Тип магических предметов
export type { ApiMagicItem } from './ApiMagicItem';

// Типы взаимодействия с приключениями
export type { ApiAdventure } from './ApiAdventure';
export type { ApiAdventureList } from './ApiAdventureList';
