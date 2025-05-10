
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
  shortName: 'shortName',
  name: 'name'
};

exports.Prisma.LanguageScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.BiomeScalarFieldEnum = {
  id: 'id',
  key: 'key',
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

exports.Prisma.Speed_statScalarFieldEnum = {
  id: 'id',
  walk: 'walk',
  fly: 'fly',
  swim: 'swim',
  burrow: 'burrow',
  climb: 'climb'
};

exports.Prisma.Creature_statsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.Strength_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.Dexterity_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.Constitution_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.Intelligence_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.Wisdom_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.Charisma_stat_detailsScalarFieldEnum = {
  statblock_id: 'statblock_id',
  value: 'value',
  mastery: 'mastery'
};

exports.Prisma.SkillsListScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.StrengthBasedSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.DexterityBasedSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.IntellengenceBasedSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.WisdomBasedSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.CharismaBasedSkillsScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.AthleticsSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.AcrobaticsSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.SleightOfHandSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.StealthSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.ArcanaSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.HistorySkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.InvestigationSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.NatureSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.ReligionSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.AnimalHandlingSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.InsightSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.MedicineSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.PerceptionSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.SurvivalSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.DeceptionSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.IntimidationSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.PerformanceSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.PersuasionSkillScalarFieldEnum = {
  id: 'id',
  value: 'value',
  mastery: 'mastery',
  name: 'name'
};

exports.Prisma.CreatureScalarFieldEnum = {
  id: 'id',
  name: 'name',
  image_uri: 'image_uri',
  description: 'description',
  size: 'size',
  race_id: 'race_id',
  source_id: 'source_id',
  alignment_id: 'alignment_id',
  armor_class: 'armor_class',
  hit_points: 'hit_points',
  challenge_rating: 'challenge_rating',
  biomes_ids: 'biomes_ids',
  type_id: 'type_id',
  aSubTypes: 'aSubTypes'
};

exports.Prisma.SensesScalarFieldEnum = {
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

exports.Prisma.GenrationRequestScalarFieldEnum = {
  id: 'id',
  request: 'request',
  danger: 'danger',
  name: 'name'
};

exports.Prisma.DamageTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.ChallengeRatingScalarFieldEnum = {
  id: 'id'
};

exports.Prisma.GPTMessageHistoryScalarFieldEnum = {
  id: 'id',
  type: 'type'
};

exports.Prisma.GPTMessageScalarFieldEnum = {
  number: 'number',
  message_history_id: 'message_history_id',
  text: 'text',
  role: 'role'
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


exports.Prisma.ModelName = {
  Size: 'Size',
  Source: 'Source',
  Language: 'Language',
  Biome: 'Biome',
  Type: 'Type',
  Alignment: 'Alignment',
  Speed_stat: 'Speed_stat',
  Creature_stats: 'Creature_stats',
  Strength_stat_details: 'Strength_stat_details',
  Dexterity_stat_details: 'Dexterity_stat_details',
  Constitution_stat_details: 'Constitution_stat_details',
  Intelligence_stat_details: 'Intelligence_stat_details',
  Wisdom_stat_details: 'Wisdom_stat_details',
  Charisma_stat_details: 'Charisma_stat_details',
  SkillsList: 'SkillsList',
  StrengthBasedSkills: 'StrengthBasedSkills',
  DexterityBasedSkills: 'DexterityBasedSkills',
  IntellengenceBasedSkills: 'IntellengenceBasedSkills',
  WisdomBasedSkills: 'WisdomBasedSkills',
  CharismaBasedSkills: 'CharismaBasedSkills',
  AthleticsSkill: 'AthleticsSkill',
  AcrobaticsSkill: 'AcrobaticsSkill',
  SleightOfHandSkill: 'SleightOfHandSkill',
  StealthSkill: 'StealthSkill',
  ArcanaSkill: 'ArcanaSkill',
  HistorySkill: 'HistorySkill',
  InvestigationSkill: 'InvestigationSkill',
  NatureSkill: 'NatureSkill',
  ReligionSkill: 'ReligionSkill',
  AnimalHandlingSkill: 'AnimalHandlingSkill',
  InsightSkill: 'InsightSkill',
  MedicineSkill: 'MedicineSkill',
  PerceptionSkill: 'PerceptionSkill',
  SurvivalSkill: 'SurvivalSkill',
  DeceptionSkill: 'DeceptionSkill',
  IntimidationSkill: 'IntimidationSkill',
  PerformanceSkill: 'PerformanceSkill',
  PersuasionSkill: 'PersuasionSkill',
  Creature: 'Creature',
  Senses: 'Senses',
  Action: 'Action',
  Trait: 'Trait',
  CreatureRace: 'CreatureRace',
  GenrationRequest: 'GenrationRequest',
  DamageType: 'DamageType',
  ChallengeRating: 'ChallengeRating',
  GPTMessageHistory: 'GPTMessageHistory',
  GPTMessage: 'GPTMessage'
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
