
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


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

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

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




  const path = require('path')

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
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/Users/romai/Documents/projects/dunger/packages/backend/lib/prisma/generated/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "darwin-arm64",
        "native": true
      }
    ],
    "previewFeatures": [],
    "sourceFilePath": "/Users/romai/Documents/projects/dunger/packages/backend/lib/prisma/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../../dunger-core/.env"
  },
  "relativePath": "../..",
  "clientVersion": "6.4.1",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?\n// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init\n\ngenerator client {\n  provider = \"prisma-client-js\"\n  output   = \"./generated/client\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n\nmodel Size {\n  id       String     @id\n  name     String     @unique\n  creature Creature[]\n\n  @@map(\"sizes\")\n}\n\nmodel Source {\n  id         Int    @id() @default(autoincrement())\n  short_name String @unique\n  name       String\n\n  creatures  Creature[]\n  magicItems MagicItem[]\n\n  @@map(\"sources\")\n}\n\nmodel Language {\n  id   Int    @id @default(autoincrement())\n  name String @unique\n\n  creatures_relation Creature[] @relation(\"creature_languages\")\n\n  @@map(\"languages\")\n}\n\nmodel Biome {\n  id         Int    @id @default(autoincrement())\n  short_name String @unique\n  name       String @unique\n\n  creatures_relation Creature[] @relation(\"creature_biomes\")\n\n  @@map(\"biomes\")\n}\n\nmodel Type {\n  id        Int        @id @default(autoincrement())\n  name      String     @unique\n  creatures Creature[]\n\n  @@map(\"types\")\n}\n\nmodel Alignment {\n  id        Int        @id @default(autoincrement())\n  name      String     @unique\n  creatures Creature[]\n\n  @@map(\"alignments\")\n}\n\nmodel CreatureSpeed {\n  id     String @id\n  walk   Int?\n  fly    Int?\n  swim   Int?\n  burrow Int?\n  climb  Int?\n\n  creature_relation Creature @relation(references: [id], fields: [id])\n\n  @@map(\"creature_speeds\")\n}\n\nenum Ability {\n  STRENGTH\n  DEXTERITY\n  CONSTITUTION\n  INTELLIGENCE\n  WISDOM\n  CHARISMA\n\n  @@map(\"ability_enum\")\n}\n\nenum Skill {\n  ATHLETICS\n  ACROBATICS\n  SLEIGHT_OF_HAND\n  STEALTH\n  ARCANA\n  HISTORY\n  INVESTIGATION\n  NATURE\n  RELIGION\n  ANIMAL_HANDLING\n  INSIGHT\n  MEDICINE\n  PERCEPTION\n  SURVIVAL\n  DECEPTION\n  INTIMIDATION\n  PERFORMANCE\n  PERSUASION\n\n  @@map(\"skill_enum\")\n}\n\nmodel CreatureStats {\n  id String @id\n\n  stats CreatureStatDetail[]\n\n  creature_relation Creature @relation(fields: [id], references: [id])\n\n  @@map(\"creature_stats\")\n}\n\nmodel CreatureStatDetail {\n  id      String  @id @default(cuid())\n  ability Ability\n  value   Int\n  mastery Boolean\n\n  creature_stats_relation CreatureStats @relation(fields: [creature_stats_id], references: [id])\n  creature_stats_id       String\n\n  @@unique([creature_stats_id, ability])\n  @@map(\"creature_stat_details\")\n}\n\nmodel CreatureSkills {\n  id                String                @id\n  skills            CreatureSkillDetail[]\n  creature_relation Creature              @relation(fields: [id], references: [id])\n\n  @@map(\"creature_skills\")\n}\n\nmodel CreatureSkillDetail {\n  id                       String         @id @default(cuid())\n  skill                    Skill\n  value                    Int?\n  mastery                  Boolean\n  creature_skills_id       String\n  creature_skills_relation CreatureSkills @relation(fields: [creature_skills_id], references: [id])\n\n  @@unique([creature_skills_id, skill])\n  @@map(\"creature_skill_details\")\n}\n\nmodel SkillMetadata {\n  skill        Skill   @id\n  display_name String\n  ability      Ability\n\n  @@map(\"skill_metadata\")\n}\n\nmodel Creature {\n  id               String  @id @default(uuid())\n  name             String\n  creator_id       String?\n  description      String?\n  size             String?\n  race_id          Int?\n  type_id          Int?\n  source_id        Int?\n  alignment_id     Int?\n  armor_class      Int?\n  hit_points       Int?\n  challenge_rating String\n\n  // Отдельные связанные объекты\n  speed  CreatureSpeed?  @relation\n  stats  CreatureStats?  @relation\n  skills CreatureSkills? @relation\n  senses CreatureSenses? @relation\n\n  // Отношения к справочникам\n  challenge_rating_meta ChallengeRatingMetadata @relation(fields: [challenge_rating], references: [display])\n  alignment_relation    Alignment?              @relation(fields: [alignment_id], references: [id])\n  race_relation         CreatureRace?           @relation(fields: [race_id], references: [id])\n  type_relation         Type?                   @relation(fields: [type_id], references: [id])\n  size_relation         Size?                   @relation(fields: [size], references: [name])\n  source_relation       Source?                 @relation(fields: [source_id], references: [id])\n\n  // Множество значений — связи многие-ко-многим (через join-таблицы)\n  resistances        DamageType[] @relation(\"creature_resistances\")\n  immunities         DamageType[] @relation(\"creature_immunities\")\n  vulnerabilities    DamageType[] @relation(\"creature_vulnerabilities\")\n  languages_relation Language[]   @relation(\"creature_languages\")\n  biomes_relation    Biome[]      @relation(\"creature_biomes\")\n  actions_relation   Action[]     @relation(\"creature_actions\")\n  traits_relation    Trait[]      @relation(\"creature_traits\")\n\n  // История запросов\n  gpt_request_relation GPTCreatureRequest? @relation\n\n  @@map(\"creatures\")\n}\n\nmodel CreatureSenses {\n  id                 String @id @default(cuid())\n  creature_id        String\n  passive_perception Int?\n\n  creature_relation Creature @relation(fields: [creature_id], references: [id])\n\n  @@unique([creature_id])\n  @@map(\"creature_senses\")\n}\n\nmodel Action {\n  id          Int      @id @default(autoincrement())\n  name        String\n  description String   @unique\n  attack      String?\n  is_template Boolean?\n\n  creatures_relation      Creature[]     @relation(\"creature_actions\")\n  creature_races_relation CreatureRace[] @relation(\"creature_races_actions\")\n\n  @@map(\"actions\")\n}\n\nmodel Trait {\n  id          Int      @id @default(autoincrement())\n  name        String\n  description String   @unique\n  attack      String?\n  is_template Boolean?\n\n  creatures_relation      Creature[]     @relation(\"creature_traits\")\n  creature_races_relation CreatureRace[] @relation(\"creature_races_traits\")\n\n  @@map(\"traits\")\n}\n\nmodel CreatureRace {\n  id          Int    @id @default(autoincrement())\n  name        String\n  description String\n\n  traits_relation    Trait[]    @relation(\"creature_races_traits\")\n  actions_relation   Action[]   @relation(\"creature_races_actions\")\n  creatures_relation Creature[]\n\n  @@map(\"creature_races\")\n}\n\nmodel DamageType {\n  id   String @id\n  name String @unique\n\n  resistant_creatures_relation  Creature[] @relation(\"creature_resistances\")\n  immune_creatures_relation     Creature[] @relation(\"creature_immunities\")\n  vulnerable_creatures_relation Creature[] @relation(\"creature_vulnerabilities\")\n\n  @@map(\"damage_types\")\n}\n\nenum ChallengeRatingEnum {\n  CR_0\n  CR_1_8\n  CR_1_4\n  CR_1_2\n  CR_1\n  CR_2\n  CR_3\n  CR_4\n  CR_5\n  CR_6\n  CR_7\n  CR_8\n  CR_9\n  CR_10\n  CR_11\n  CR_12\n  CR_13\n  CR_14\n  CR_15\n  CR_16\n  CR_17\n  CR_18\n  CR_19\n  CR_20\n  CR_21\n  CR_22\n  CR_23\n  CR_24\n  CR_25\n  CR_26\n  CR_27\n  CR_28\n  CR_29\n  CR_30\n\n  @@map(\"challenge_rating_enum\")\n}\n\nmodel ChallengeRatingMetadata {\n  cr        ChallengeRatingEnum @id\n  display   String              @unique\n  numeric   Float\n  xp_reward Int\n\n  creatures Creature[]\n\n  @@map(\"challenge_rating_metadata\")\n}\n\nenum CreatureRole {\n  OFFENCE\n  DEFENCE\n}\n\nmodel GPTCreatureRequest {\n  id                   Int           @id @default(autoincrement())\n  creature_id          String        @unique\n  name                 String\n  challenge_rating     String\n  type_name            String\n  creation_description String?\n  role                 CreatureRole?\n  createdAt            DateTime      @default(now())\n\n  creature_relation Creature @relation(fields: [creature_id], references: [id])\n\n  @@map(\"gpt_creature_request\")\n}\n\nmodel Adventure {\n  id         String @id @default(uuid())\n  name       String\n  genre_id   String\n  creator_id String\n\n  genre_relation    Genre     @relation(fields: [genre_id], references: [id])\n  keywords_relation Keyword[] @relation(\"adventure_keywords\")\n\n  created_at DateTime @default(now())\n  updated_at DateTime @updatedAt\n\n  @@map(\"adventures\")\n}\n\nmodel Keyword {\n  id       String @id @default(uuid())\n  name     String\n  genre_id String\n\n  genre_relation      Genre       @relation(fields: [genre_id], references: [id])\n  adventures_relation Adventure[] @relation(\"adventure_keywords\")\n\n  @@map(\"keywords\")\n}\n\nmodel Genre {\n  id   String @id @default(uuid())\n  name String\n\n  keywords_relation   Keyword[]\n  adventures_relation Adventure[]\n\n  @@map(\"genres\")\n}\n\nenum Gender {\n  HE\n  SHE\n  IT\n\n  @@map(\"gender_enum\")\n}\n\nmodel MagicItem {\n  id                  String  @id @default(uuid())\n  name                String\n  description         String\n  type_id             String\n  rarity_id           String\n  source_id           Int\n  requires_attunement Boolean @default(false)\n\n  type_relation        MagicItemType         @relation(fields: [type_id], references: [id])\n  rarity_relation      MagicItemRarity       @relation(fields: [rarity_id], references: [id])\n  source_relation      Source                @relation(fields: [source_id], references: [id])\n  attunements_relation MagicItemAttunement[] @relation(\"MagicItemToAttunement\")\n\n  @@map(\"magic_items\")\n}\n\nmodel MagicItemRarity {\n  id       String @id\n  cost     String\n  name     String\n  name_he  String\n  name_she String\n  name_it  String\n  order    Int\n\n  magicItems MagicItem[]\n\n  @@map(\"magic_item_rarities\")\n}\n\nmodel MagicItemType {\n  id     String @id\n  name   String\n  gender Gender\n\n  magicItems MagicItem[]\n\n  @@map(\"magic_item_types\")\n}\n\nmodel AttunementCondition {\n  id         String                @id @default(uuid()) @map(\"id\")\n  name       String                @unique @map(\"name\")\n  magicItems MagicItemAttunement[] @relation(\"AttunementToMagicItem\")\n\n  @@map(\"attunement_conditions\")\n}\n\nmodel MagicItemAttunement {\n  magicItemId  String\n  attunementId String\n\n  magicItem  MagicItem           @relation(\"MagicItemToAttunement\", fields: [magicItemId], references: [id])\n  attunement AttunementCondition @relation(\"AttunementToMagicItem\", fields: [attunementId], references: [id])\n\n  @@id([magicItemId, attunementId])\n  @@map(\"magic_item_attunements\")\n}\n",
  "inlineSchemaHash": "e97a39289fd5a91413347b67a1cbb25562653d8c66edcc62f0557e69c327750e",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "../lib/prisma/generated/client",
    "lib/prisma/generated/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Size\":{\"dbName\":\"sizes\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToSize\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Source\":{\"dbName\":\"sources\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"short_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToSource\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"magicItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItem\",\"nativeType\":null,\"relationName\":\"MagicItemToSource\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Language\":{\"dbName\":\"languages\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_languages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Biome\":{\"dbName\":\"biomes\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"short_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_biomes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Type\":{\"dbName\":\"types\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToType\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Alignment\":{\"dbName\":\"alignments\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"AlignmentToCreature\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureSpeed\":{\"dbName\":\"creature_speeds\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"walk\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fly\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"swim\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"burrow\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"climb\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSpeed\",\"relationFromFields\":[\"id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureStats\":{\"dbName\":\"creature_stats\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stats\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureStatDetail\",\"nativeType\":null,\"relationName\":\"CreatureStatDetailToCreatureStats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureStats\",\"relationFromFields\":[\"id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureStatDetail\":{\"dbName\":\"creature_stat_details\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ability\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ability\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mastery\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_stats_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureStats\",\"nativeType\":null,\"relationName\":\"CreatureStatDetailToCreatureStats\",\"relationFromFields\":[\"creature_stats_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_stats_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"creature_stats_id\",\"ability\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"creature_stats_id\",\"ability\"]}],\"isGenerated\":false},\"CreatureSkills\":{\"dbName\":\"creature_skills\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skills\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureSkillDetail\",\"nativeType\":null,\"relationName\":\"CreatureSkillDetailToCreatureSkills\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSkills\",\"relationFromFields\":[\"id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureSkillDetail\":{\"dbName\":\"creature_skill_details\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skill\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Skill\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"value\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mastery\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_skills_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_skills_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureSkills\",\"nativeType\":null,\"relationName\":\"CreatureSkillDetailToCreatureSkills\",\"relationFromFields\":[\"creature_skills_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"creature_skills_id\",\"skill\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"creature_skills_id\",\"skill\"]}],\"isGenerated\":false},\"SkillMetadata\":{\"dbName\":\"skill_metadata\",\"schema\":null,\"fields\":[{\"name\":\"skill\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Skill\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"display_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ability\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Ability\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Creature\":{\"dbName\":\"creatures\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"race_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alignment_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"armor_class\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hit_points\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"challenge_rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"speed\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureSpeed\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSpeed\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stats\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureStats\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureStats\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"skills\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureSkills\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSkills\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"senses\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureSenses\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSenses\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"challenge_rating_meta\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChallengeRatingMetadata\",\"nativeType\":null,\"relationName\":\"ChallengeRatingMetadataToCreature\",\"relationFromFields\":[\"challenge_rating\"],\"relationToFields\":[\"display\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"alignment_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Alignment\",\"nativeType\":null,\"relationName\":\"AlignmentToCreature\",\"relationFromFields\":[\"alignment_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"race_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureRace\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureRace\",\"relationFromFields\":[\"race_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Type\",\"nativeType\":null,\"relationName\":\"CreatureToType\",\"relationFromFields\":[\"type_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"size_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Size\",\"nativeType\":null,\"relationName\":\"CreatureToSize\",\"relationFromFields\":[\"size\"],\"relationToFields\":[\"name\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Source\",\"nativeType\":null,\"relationName\":\"CreatureToSource\",\"relationFromFields\":[\"source_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resistances\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DamageType\",\"nativeType\":null,\"relationName\":\"creature_resistances\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"immunities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DamageType\",\"nativeType\":null,\"relationName\":\"creature_immunities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vulnerabilities\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DamageType\",\"nativeType\":null,\"relationName\":\"creature_vulnerabilities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"languages_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Language\",\"nativeType\":null,\"relationName\":\"creature_languages\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"biomes_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Biome\",\"nativeType\":null,\"relationName\":\"creature_biomes\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actions_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Action\",\"nativeType\":null,\"relationName\":\"creature_actions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"traits_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trait\",\"nativeType\":null,\"relationName\":\"creature_traits\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gpt_request_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"GPTCreatureRequest\",\"nativeType\":null,\"relationName\":\"CreatureToGPTCreatureRequest\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureSenses\":{\"dbName\":\"creature_senses\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"cuid\",\"args\":[1]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"passive_perception\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureSenses\",\"relationFromFields\":[\"creature_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[[\"creature_id\"]],\"uniqueIndexes\":[{\"name\":null,\"fields\":[\"creature_id\"]}],\"isGenerated\":false},\"Action\":{\"dbName\":\"actions\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attack\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_template\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_actions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_races_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureRace\",\"nativeType\":null,\"relationName\":\"creature_races_actions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Trait\":{\"dbName\":\"traits\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attack\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"is_template\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Boolean\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_traits\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_races_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureRace\",\"nativeType\":null,\"relationName\":\"creature_races_traits\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"CreatureRace\":{\"dbName\":\"creature_races\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"traits_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Trait\",\"nativeType\":null,\"relationName\":\"creature_races_traits\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"actions_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Action\",\"nativeType\":null,\"relationName\":\"creature_races_actions\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToCreatureRace\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"DamageType\":{\"dbName\":\"damage_types\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"resistant_creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_resistances\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"immune_creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_immunities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"vulnerable_creatures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"creature_vulnerabilities\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"ChallengeRatingMetadata\":{\"dbName\":\"challenge_rating_metadata\",\"schema\":null,\"fields\":[{\"name\":\"cr\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"ChallengeRatingEnum\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"display\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numeric\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Float\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"xp_reward\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creatures\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"ChallengeRatingMetadataToCreature\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"GPTCreatureRequest\":{\"dbName\":\"gpt_creature_request\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"challenge_rating\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creation_description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"role\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"CreatureRole\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creature_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Creature\",\"nativeType\":null,\"relationName\":\"CreatureToGPTCreatureRequest\",\"relationFromFields\":[\"creature_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Adventure\":{\"dbName\":\"adventures\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"creator_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Genre\",\"nativeType\":null,\"relationName\":\"AdventureToGenre\",\"relationFromFields\":[\"genre_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keywords_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Keyword\",\"nativeType\":null,\"relationName\":\"adventure_keywords\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"created_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"updated_at\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":true}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Keyword\":{\"dbName\":\"keywords\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"genre_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Genre\",\"nativeType\":null,\"relationName\":\"GenreToKeyword\",\"relationFromFields\":[\"genre_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adventures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Adventure\",\"nativeType\":null,\"relationName\":\"adventure_keywords\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Genre\":{\"dbName\":\"genres\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keywords_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Keyword\",\"nativeType\":null,\"relationName\":\"GenreToKeyword\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"adventures_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Adventure\",\"nativeType\":null,\"relationName\":\"AdventureToGenre\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MagicItem\":{\"dbName\":\"magic_items\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"description\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rarity_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"requires_attunement\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Boolean\",\"nativeType\":null,\"default\":false,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"type_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItemType\",\"nativeType\":null,\"relationName\":\"MagicItemToMagicItemType\",\"relationFromFields\":[\"type_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rarity_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItemRarity\",\"nativeType\":null,\"relationName\":\"MagicItemToMagicItemRarity\",\"relationFromFields\":[\"rarity_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"source_relation\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Source\",\"nativeType\":null,\"relationName\":\"MagicItemToSource\",\"relationFromFields\":[\"source_id\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attunements_relation\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItemAttunement\",\"nativeType\":null,\"relationName\":\"MagicItemToAttunement\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MagicItemRarity\":{\"dbName\":\"magic_item_rarities\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"cost\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name_he\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name_she\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name_it\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"order\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"magicItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItem\",\"nativeType\":null,\"relationName\":\"MagicItemToMagicItemRarity\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MagicItemType\":{\"dbName\":\"magic_item_types\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"gender\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Gender\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"magicItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItem\",\"nativeType\":null,\"relationName\":\"MagicItemToMagicItemType\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"AttunementCondition\":{\"dbName\":\"attunement_conditions\",\"schema\":null,\"fields\":[{\"name\":\"id\",\"dbName\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"nativeType\":null,\"default\":{\"name\":\"uuid\",\"args\":[4]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"dbName\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"magicItems\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItemAttunement\",\"nativeType\":null,\"relationName\":\"AttunementToMagicItem\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"MagicItemAttunement\":{\"dbName\":\"magic_item_attunements\",\"schema\":null,\"fields\":[{\"name\":\"magicItemId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attunementId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"magicItem\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"MagicItem\",\"nativeType\":null,\"relationName\":\"MagicItemToAttunement\",\"relationFromFields\":[\"magicItemId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"attunement\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"AttunementCondition\",\"nativeType\":null,\"relationName\":\"AttunementToMagicItem\",\"relationFromFields\":[\"attunementId\"],\"relationToFields\":[\"id\"],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"magicItemId\",\"attunementId\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Ability\":{\"values\":[{\"name\":\"STRENGTH\",\"dbName\":null},{\"name\":\"DEXTERITY\",\"dbName\":null},{\"name\":\"CONSTITUTION\",\"dbName\":null},{\"name\":\"INTELLIGENCE\",\"dbName\":null},{\"name\":\"WISDOM\",\"dbName\":null},{\"name\":\"CHARISMA\",\"dbName\":null}],\"dbName\":\"ability_enum\"},\"Skill\":{\"values\":[{\"name\":\"ATHLETICS\",\"dbName\":null},{\"name\":\"ACROBATICS\",\"dbName\":null},{\"name\":\"SLEIGHT_OF_HAND\",\"dbName\":null},{\"name\":\"STEALTH\",\"dbName\":null},{\"name\":\"ARCANA\",\"dbName\":null},{\"name\":\"HISTORY\",\"dbName\":null},{\"name\":\"INVESTIGATION\",\"dbName\":null},{\"name\":\"NATURE\",\"dbName\":null},{\"name\":\"RELIGION\",\"dbName\":null},{\"name\":\"ANIMAL_HANDLING\",\"dbName\":null},{\"name\":\"INSIGHT\",\"dbName\":null},{\"name\":\"MEDICINE\",\"dbName\":null},{\"name\":\"PERCEPTION\",\"dbName\":null},{\"name\":\"SURVIVAL\",\"dbName\":null},{\"name\":\"DECEPTION\",\"dbName\":null},{\"name\":\"INTIMIDATION\",\"dbName\":null},{\"name\":\"PERFORMANCE\",\"dbName\":null},{\"name\":\"PERSUASION\",\"dbName\":null}],\"dbName\":\"skill_enum\"},\"ChallengeRatingEnum\":{\"values\":[{\"name\":\"CR_0\",\"dbName\":null},{\"name\":\"CR_1_8\",\"dbName\":null},{\"name\":\"CR_1_4\",\"dbName\":null},{\"name\":\"CR_1_2\",\"dbName\":null},{\"name\":\"CR_1\",\"dbName\":null},{\"name\":\"CR_2\",\"dbName\":null},{\"name\":\"CR_3\",\"dbName\":null},{\"name\":\"CR_4\",\"dbName\":null},{\"name\":\"CR_5\",\"dbName\":null},{\"name\":\"CR_6\",\"dbName\":null},{\"name\":\"CR_7\",\"dbName\":null},{\"name\":\"CR_8\",\"dbName\":null},{\"name\":\"CR_9\",\"dbName\":null},{\"name\":\"CR_10\",\"dbName\":null},{\"name\":\"CR_11\",\"dbName\":null},{\"name\":\"CR_12\",\"dbName\":null},{\"name\":\"CR_13\",\"dbName\":null},{\"name\":\"CR_14\",\"dbName\":null},{\"name\":\"CR_15\",\"dbName\":null},{\"name\":\"CR_16\",\"dbName\":null},{\"name\":\"CR_17\",\"dbName\":null},{\"name\":\"CR_18\",\"dbName\":null},{\"name\":\"CR_19\",\"dbName\":null},{\"name\":\"CR_20\",\"dbName\":null},{\"name\":\"CR_21\",\"dbName\":null},{\"name\":\"CR_22\",\"dbName\":null},{\"name\":\"CR_23\",\"dbName\":null},{\"name\":\"CR_24\",\"dbName\":null},{\"name\":\"CR_25\",\"dbName\":null},{\"name\":\"CR_26\",\"dbName\":null},{\"name\":\"CR_27\",\"dbName\":null},{\"name\":\"CR_28\",\"dbName\":null},{\"name\":\"CR_29\",\"dbName\":null},{\"name\":\"CR_30\",\"dbName\":null}],\"dbName\":\"challenge_rating_enum\"},\"CreatureRole\":{\"values\":[{\"name\":\"OFFENCE\",\"dbName\":null},{\"name\":\"DEFENCE\",\"dbName\":null}],\"dbName\":null},\"Gender\":{\"values\":[{\"name\":\"HE\",\"dbName\":null},{\"name\":\"SHE\",\"dbName\":null},{\"name\":\"IT\",\"dbName\":null}],\"dbName\":\"gender_enum\"}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-darwin-arm64.dylib.node");
path.join(process.cwd(), "../lib/prisma/generated/client/libquery_engine-darwin-arm64.dylib.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "../lib/prisma/generated/client/schema.prisma")
