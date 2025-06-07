
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.4.1
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.4.1",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SizeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SourceScalarFieldEnum = {
  id: 'id',
  short_name: 'short_name',
  name: 'name'
};

exports.Prisma.LanguageScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.BiomeScalarFieldEnum = {
  id: 'id',
  short_name: 'short_name',
  name: 'name'
};

exports.Prisma.TypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.AlignmentScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CreatureSpeedScalarFieldEnum = {
  id: 'id',
  walk: 'walk',
  fly: 'fly',
  swim: 'swim',
  burrow: 'burrow',
  climb: 'climb'
};

exports.Prisma.CreatureStatsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.CreatureStatDetailScalarFieldEnum = {
  id: 'id',
  ability: 'ability',
  value: 'value',
  mastery: 'mastery',
  creature_stats_id: 'creature_stats_id'
};

exports.Prisma.CreatureSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.CreatureSkillDetailScalarFieldEnum = {
  id: 'id',
  skill: 'skill',
  value: 'value',
  mastery: 'mastery',
  creature_skills_id: 'creature_skills_id'
};

exports.Prisma.SkillMetadataScalarFieldEnum = {
  skill: 'skill',
  display_name: 'display_name',
  ability: 'ability'
};

exports.Prisma.CreatureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  creator_id: 'creator_id',
  description: 'description',
  size: 'size',
  race_id: 'race_id',
  type_id: 'type_id',
  source_id: 'source_id',
  alignment_id: 'alignment_id',
  armor_class: 'armor_class',
  hit_points: 'hit_points',
  challenge_rating: 'challenge_rating'
};

exports.Prisma.CreatureSensesScalarFieldEnum = {
  id: 'id',
  creature_id: 'creature_id',
  passive_perception: 'passive_perception'
};

exports.Prisma.ActionScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  attack: 'attack',
  is_template: 'is_template'
};

exports.Prisma.TraitScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  attack: 'attack',
  is_template: 'is_template'
};

exports.Prisma.CreatureRaceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.DamageTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.ChallengeRatingMetadataScalarFieldEnum = {
  cr: 'cr',
  display: 'display',
  numeric: 'numeric',
  xp_reward: 'xp_reward'
};

exports.Prisma.GPTCreatureRequestScalarFieldEnum = {
  id: 'id',
  creature_id: 'creature_id',
  name: 'name',
  challenge_rating: 'challenge_rating',
  type_name: 'type_name',
  creation_description: 'creation_description',
  role: 'role',
  createdAt: 'createdAt'
};

exports.Prisma.AdventureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  genre_id: 'genre_id',
  creator_id: 'creator_id',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.KeywordScalarFieldEnum = {
  id: 'id',
  name: 'name',
  genre_id: 'genre_id'
};

exports.Prisma.GenreScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.MagicItemScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  type_id: 'type_id',
  rarity_id: 'rarity_id',
  source_id: 'source_id',
  requires_attunement: 'requires_attunement'
};

exports.Prisma.MagicItemRarityScalarFieldEnum = {
  id: 'id',
  cost: 'cost',
  name: 'name',
  name_he: 'name_he',
  name_she: 'name_she',
  name_it: 'name_it',
  order: 'order'
};

exports.Prisma.MagicItemTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  gender: 'gender'
};

exports.Prisma.AttunementConditionScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.MagicItemAttunementScalarFieldEnum = {
  magicItemId: 'magicItemId',
  attunementId: 'attunementId'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Ability = exports.$Enums.Ability = {
  STRENGTH: 'STRENGTH',
  DEXTERITY: 'DEXTERITY',
  CONSTITUTION: 'CONSTITUTION',
  INTELLIGENCE: 'INTELLIGENCE',
  WISDOM: 'WISDOM',
  CHARISMA: 'CHARISMA'
};

exports.Skill = exports.$Enums.Skill = {
  ATHLETICS: 'ATHLETICS',
  ACROBATICS: 'ACROBATICS',
  SLEIGHT_OF_HAND: 'SLEIGHT_OF_HAND',
  STEALTH: 'STEALTH',
  ARCANA: 'ARCANA',
  HISTORY: 'HISTORY',
  INVESTIGATION: 'INVESTIGATION',
  NATURE: 'NATURE',
  RELIGION: 'RELIGION',
  ANIMAL_HANDLING: 'ANIMAL_HANDLING',
  INSIGHT: 'INSIGHT',
  MEDICINE: 'MEDICINE',
  PERCEPTION: 'PERCEPTION',
  SURVIVAL: 'SURVIVAL',
  DECEPTION: 'DECEPTION',
  INTIMIDATION: 'INTIMIDATION',
  PERFORMANCE: 'PERFORMANCE',
  PERSUASION: 'PERSUASION'
};

exports.ChallengeRatingEnum = exports.$Enums.ChallengeRatingEnum = {
  CR_0: 'CR_0',
  CR_1_8: 'CR_1_8',
  CR_1_4: 'CR_1_4',
  CR_1_2: 'CR_1_2',
  CR_1: 'CR_1',
  CR_2: 'CR_2',
  CR_3: 'CR_3',
  CR_4: 'CR_4',
  CR_5: 'CR_5',
  CR_6: 'CR_6',
  CR_7: 'CR_7',
  CR_8: 'CR_8',
  CR_9: 'CR_9',
  CR_10: 'CR_10',
  CR_11: 'CR_11',
  CR_12: 'CR_12',
  CR_13: 'CR_13',
  CR_14: 'CR_14',
  CR_15: 'CR_15',
  CR_16: 'CR_16',
  CR_17: 'CR_17',
  CR_18: 'CR_18',
  CR_19: 'CR_19',
  CR_20: 'CR_20',
  CR_21: 'CR_21',
  CR_22: 'CR_22',
  CR_23: 'CR_23',
  CR_24: 'CR_24',
  CR_25: 'CR_25',
  CR_26: 'CR_26',
  CR_27: 'CR_27',
  CR_28: 'CR_28',
  CR_29: 'CR_29',
  CR_30: 'CR_30'
};

exports.CreatureRole = exports.$Enums.CreatureRole = {
  OFFENCE: 'OFFENCE',
  DEFENCE: 'DEFENCE'
};

exports.Gender = exports.$Enums.Gender = {
  HE: 'HE',
  SHE: 'SHE',
  IT: 'IT'
};

exports.Prisma.ModelName = {
  Size: 'Size',
  Source: 'Source',
  Language: 'Language',
  Biome: 'Biome',
  Type: 'Type',
  Alignment: 'Alignment',
  CreatureSpeed: 'CreatureSpeed',
  CreatureStats: 'CreatureStats',
  CreatureStatDetail: 'CreatureStatDetail',
  CreatureSkills: 'CreatureSkills',
  CreatureSkillDetail: 'CreatureSkillDetail',
  SkillMetadata: 'SkillMetadata',
  Creature: 'Creature',
  CreatureSenses: 'CreatureSenses',
  Action: 'Action',
  Trait: 'Trait',
  CreatureRace: 'CreatureRace',
  DamageType: 'DamageType',
  ChallengeRatingMetadata: 'ChallengeRatingMetadata',
  GPTCreatureRequest: 'GPTCreatureRequest',
  Adventure: 'Adventure',
  Keyword: 'Keyword',
  Genre: 'Genre',
  MagicItem: 'MagicItem',
  MagicItemRarity: 'MagicItemRarity',
  MagicItemType: 'MagicItemType',
  AttunementCondition: 'AttunementCondition',
  MagicItemAttunement: 'MagicItemAttunement'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
