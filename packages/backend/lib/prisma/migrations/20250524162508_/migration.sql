/*
  Warnings:

  - You are about to drop the `AcrobaticsSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Alignment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AnimalHandlingSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ArcanaSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `AthleticsSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Biome` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ChallengeRating` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CharismaBasedSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Charisma_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Constitution_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Creature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CreatureRace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Creature_stats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DamageType` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DeceptionSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DexterityBasedSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Dexterity_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GPTMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GPTMessageHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GenrationRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `HistorySkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InsightSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IntellengenceBasedSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Intelligence_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `IntimidationSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `InvestigationSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Language` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MedicineSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NatureSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerceptionSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PerformanceSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PersuasionSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReligionSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Senses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SkillsList` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SleightOfHandSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Source` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Speed_stat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StealthSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `StrengthBasedSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Strength_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SurvivalSkill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Trait` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WisdomBasedSkills` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wisdom_stat_details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActionToCreature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_ActionToCreatureRace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AdventureKeywords` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BiomeToCreature` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CreatureRaceToTrait` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CreatureToLanguage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CreatureToTrait` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `gender` on the `magic_item_types` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "ability_enum" AS ENUM ('STRENGTH', 'DEXTERITY', 'CONSTITUTION', 'INTELLIGENCE', 'WISDOM', 'CHARISMA');

-- CreateEnum
CREATE TYPE "skill_enum" AS ENUM ('ATHLETICS', 'ACROBATICS', 'SLEIGHT_OF_HAND', 'STEALTH', 'ARCANA', 'HISTORY', 'INVESTIGATION', 'NATURE', 'RELIGION', 'ANIMAL_HANDLING', 'INSIGHT', 'MEDICINE', 'PERCEPTION', 'SURVIVAL', 'DECEPTION', 'INTIMIDATION', 'PERFORMANCE', 'PERSUASION');

-- CreateEnum
CREATE TYPE "challenge_rating_enum" AS ENUM ('CR_0', 'CR_1_8', 'CR_1_4', 'CR_1_2', 'CR_1', 'CR_2', 'CR_3', 'CR_4', 'CR_5', 'CR_6', 'CR_7', 'CR_8', 'CR_9', 'CR_10', 'CR_11', 'CR_12', 'CR_13', 'CR_14', 'CR_15', 'CR_16', 'CR_17', 'CR_18', 'CR_19', 'CR_20', 'CR_21', 'CR_22', 'CR_23', 'CR_24', 'CR_25', 'CR_26', 'CR_27', 'CR_28', 'CR_29', 'CR_30');

-- CreateEnum
CREATE TYPE "gender_enum" AS ENUM ('HE', 'SHE', 'IT');

-- DropForeignKey
ALTER TABLE "AcrobaticsSkill" DROP CONSTRAINT "AcrobaticsSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "AnimalHandlingSkill" DROP CONSTRAINT "AnimalHandlingSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "ArcanaSkill" DROP CONSTRAINT "ArcanaSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "AthleticsSkill" DROP CONSTRAINT "AthleticsSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "CharismaBasedSkills" DROP CONSTRAINT "CharismaBasedSkills_id_fkey";

-- DropForeignKey
ALTER TABLE "Charisma_stat_details" DROP CONSTRAINT "Charisma_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "Constitution_stat_details" DROP CONSTRAINT "Constitution_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_alignment_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_race_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_size_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_source_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature_stats" DROP CONSTRAINT "Creature_stats_id_fkey";

-- DropForeignKey
ALTER TABLE "DeceptionSkill" DROP CONSTRAINT "DeceptionSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "DexterityBasedSkills" DROP CONSTRAINT "DexterityBasedSkills_id_fkey";

-- DropForeignKey
ALTER TABLE "Dexterity_stat_details" DROP CONSTRAINT "Dexterity_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "GPTMessage" DROP CONSTRAINT "GPTMessage_message_history_id_fkey";

-- DropForeignKey
ALTER TABLE "HistorySkill" DROP CONSTRAINT "HistorySkill_id_fkey";

-- DropForeignKey
ALTER TABLE "InsightSkill" DROP CONSTRAINT "InsightSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "IntellengenceBasedSkills" DROP CONSTRAINT "IntellengenceBasedSkills_id_fkey";

-- DropForeignKey
ALTER TABLE "Intelligence_stat_details" DROP CONSTRAINT "Intelligence_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "IntimidationSkill" DROP CONSTRAINT "IntimidationSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "InvestigationSkill" DROP CONSTRAINT "InvestigationSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicineSkill" DROP CONSTRAINT "MedicineSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "NatureSkill" DROP CONSTRAINT "NatureSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "PerceptionSkill" DROP CONSTRAINT "PerceptionSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceSkill" DROP CONSTRAINT "PerformanceSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "PersuasionSkill" DROP CONSTRAINT "PersuasionSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "ReligionSkill" DROP CONSTRAINT "ReligionSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "Senses" DROP CONSTRAINT "Senses_creature_id_fkey";

-- DropForeignKey
ALTER TABLE "SkillsList" DROP CONSTRAINT "SkillsList_id_fkey";

-- DropForeignKey
ALTER TABLE "SleightOfHandSkill" DROP CONSTRAINT "SleightOfHandSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "Speed_stat" DROP CONSTRAINT "Speed_stat_id_fkey";

-- DropForeignKey
ALTER TABLE "StealthSkill" DROP CONSTRAINT "StealthSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "StrengthBasedSkills" DROP CONSTRAINT "StrengthBasedSkills_id_fkey";

-- DropForeignKey
ALTER TABLE "Strength_stat_details" DROP CONSTRAINT "Strength_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "SurvivalSkill" DROP CONSTRAINT "SurvivalSkill_id_fkey";

-- DropForeignKey
ALTER TABLE "WisdomBasedSkills" DROP CONSTRAINT "WisdomBasedSkills_id_fkey";

-- DropForeignKey
ALTER TABLE "Wisdom_stat_details" DROP CONSTRAINT "Wisdom_stat_details_statblock_id_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToCreature" DROP CONSTRAINT "_ActionToCreature_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToCreature" DROP CONSTRAINT "_ActionToCreature_B_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToCreatureRace" DROP CONSTRAINT "_ActionToCreatureRace_A_fkey";

-- DropForeignKey
ALTER TABLE "_ActionToCreatureRace" DROP CONSTRAINT "_ActionToCreatureRace_B_fkey";

-- DropForeignKey
ALTER TABLE "_AdventureKeywords" DROP CONSTRAINT "_AdventureKeywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdventureKeywords" DROP CONSTRAINT "_AdventureKeywords_B_fkey";

-- DropForeignKey
ALTER TABLE "_BiomeToCreature" DROP CONSTRAINT "_BiomeToCreature_A_fkey";

-- DropForeignKey
ALTER TABLE "_BiomeToCreature" DROP CONSTRAINT "_BiomeToCreature_B_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureRaceToTrait" DROP CONSTRAINT "_CreatureRaceToTrait_A_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureRaceToTrait" DROP CONSTRAINT "_CreatureRaceToTrait_B_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureToLanguage" DROP CONSTRAINT "_CreatureToLanguage_A_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureToLanguage" DROP CONSTRAINT "_CreatureToLanguage_B_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureToTrait" DROP CONSTRAINT "_CreatureToTrait_A_fkey";

-- DropForeignKey
ALTER TABLE "_CreatureToTrait" DROP CONSTRAINT "_CreatureToTrait_B_fkey";

-- DropForeignKey
ALTER TABLE "_creature_immunities" DROP CONSTRAINT "_creature_immunities_A_fkey";

-- DropForeignKey
ALTER TABLE "_creature_immunities" DROP CONSTRAINT "_creature_immunities_B_fkey";

-- DropForeignKey
ALTER TABLE "_creature_resistances" DROP CONSTRAINT "_creature_resistances_A_fkey";

-- DropForeignKey
ALTER TABLE "_creature_resistances" DROP CONSTRAINT "_creature_resistances_B_fkey";

-- DropForeignKey
ALTER TABLE "_creature_vulnerabilities" DROP CONSTRAINT "_creature_vulnerabilities_A_fkey";

-- DropForeignKey
ALTER TABLE "_creature_vulnerabilities" DROP CONSTRAINT "_creature_vulnerabilities_B_fkey";

-- DropForeignKey
ALTER TABLE "magic_items" DROP CONSTRAINT "magic_items_source_id_fkey";

-- AlterTable
ALTER TABLE "magic_item_types" DROP COLUMN "gender",
ADD COLUMN     "gender" "gender_enum" NOT NULL;

-- DropTable
DROP TABLE "AcrobaticsSkill";

-- DropTable
DROP TABLE "Action";

-- DropTable
DROP TABLE "Alignment";

-- DropTable
DROP TABLE "AnimalHandlingSkill";

-- DropTable
DROP TABLE "ArcanaSkill";

-- DropTable
DROP TABLE "AthleticsSkill";

-- DropTable
DROP TABLE "Biome";

-- DropTable
DROP TABLE "ChallengeRating";

-- DropTable
DROP TABLE "CharismaBasedSkills";

-- DropTable
DROP TABLE "Charisma_stat_details";

-- DropTable
DROP TABLE "Constitution_stat_details";

-- DropTable
DROP TABLE "Creature";

-- DropTable
DROP TABLE "CreatureRace";

-- DropTable
DROP TABLE "Creature_stats";

-- DropTable
DROP TABLE "DamageType";

-- DropTable
DROP TABLE "DeceptionSkill";

-- DropTable
DROP TABLE "DexterityBasedSkills";

-- DropTable
DROP TABLE "Dexterity_stat_details";

-- DropTable
DROP TABLE "GPTMessage";

-- DropTable
DROP TABLE "GPTMessageHistory";

-- DropTable
DROP TABLE "GenrationRequest";

-- DropTable
DROP TABLE "HistorySkill";

-- DropTable
DROP TABLE "InsightSkill";

-- DropTable
DROP TABLE "IntellengenceBasedSkills";

-- DropTable
DROP TABLE "Intelligence_stat_details";

-- DropTable
DROP TABLE "IntimidationSkill";

-- DropTable
DROP TABLE "InvestigationSkill";

-- DropTable
DROP TABLE "Language";

-- DropTable
DROP TABLE "MedicineSkill";

-- DropTable
DROP TABLE "NatureSkill";

-- DropTable
DROP TABLE "PerceptionSkill";

-- DropTable
DROP TABLE "PerformanceSkill";

-- DropTable
DROP TABLE "PersuasionSkill";

-- DropTable
DROP TABLE "ReligionSkill";

-- DropTable
DROP TABLE "Senses";

-- DropTable
DROP TABLE "Size";

-- DropTable
DROP TABLE "SkillsList";

-- DropTable
DROP TABLE "SleightOfHandSkill";

-- DropTable
DROP TABLE "Source";

-- DropTable
DROP TABLE "Speed_stat";

-- DropTable
DROP TABLE "StealthSkill";

-- DropTable
DROP TABLE "StrengthBasedSkills";

-- DropTable
DROP TABLE "Strength_stat_details";

-- DropTable
DROP TABLE "SurvivalSkill";

-- DropTable
DROP TABLE "Trait";

-- DropTable
DROP TABLE "Type";

-- DropTable
DROP TABLE "WisdomBasedSkills";

-- DropTable
DROP TABLE "Wisdom_stat_details";

-- DropTable
DROP TABLE "_ActionToCreature";

-- DropTable
DROP TABLE "_ActionToCreatureRace";

-- DropTable
DROP TABLE "_AdventureKeywords";

-- DropTable
DROP TABLE "_BiomeToCreature";

-- DropTable
DROP TABLE "_CreatureRaceToTrait";

-- DropTable
DROP TABLE "_CreatureToLanguage";

-- DropTable
DROP TABLE "_CreatureToTrait";

-- DropEnum
DROP TYPE "Gender";

-- DropEnum
DROP TYPE "Stat";

-- CreateTable
CREATE TABLE "sizes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sizes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sources" (
    "id" SERIAL NOT NULL,
    "short_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "languages" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "biomes" (
    "id" SERIAL NOT NULL,
    "short_name" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "biomes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "types" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alignments" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "alignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_speeds" (
    "id" TEXT NOT NULL,
    "walk" INTEGER,
    "fly" INTEGER,
    "swim" INTEGER,
    "burrow" INTEGER,
    "climb" INTEGER,

    CONSTRAINT "creature_speeds_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_stats" (
    "id" TEXT NOT NULL,

    CONSTRAINT "creature_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_stat_details" (
    "id" TEXT NOT NULL,
    "ability" "ability_enum" NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "creature_stats_id" TEXT NOT NULL,

    CONSTRAINT "creature_stat_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_skills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "creature_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_skill_details" (
    "id" TEXT NOT NULL,
    "skill" "skill_enum" NOT NULL,
    "value" INTEGER,
    "mastery" BOOLEAN NOT NULL,
    "creature_skills_id" TEXT NOT NULL,

    CONSTRAINT "creature_skill_details_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "skill_metadata" (
    "skill" "skill_enum" NOT NULL,
    "display_name" TEXT NOT NULL,
    "ability" "ability_enum" NOT NULL,

    CONSTRAINT "skill_metadata_pkey" PRIMARY KEY ("skill")
);

-- CreateTable
CREATE TABLE "creatures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "creator_id" TEXT,
    "description" TEXT,
    "size" TEXT,
    "race_id" INTEGER,
    "type_id" INTEGER,
    "source_id" INTEGER,
    "alignment_id" INTEGER,
    "armor_class" INTEGER,
    "hit_points" INTEGER,
    "challenge_rating" TEXT NOT NULL,

    CONSTRAINT "creatures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_senses" (
    "id" TEXT NOT NULL,
    "creature_id" TEXT NOT NULL,
    "passive_perception" INTEGER,

    CONSTRAINT "creature_senses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "actions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attack" TEXT,
    "is_template" BOOLEAN,

    CONSTRAINT "actions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "traits" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attack" TEXT,
    "is_template" BOOLEAN,

    CONSTRAINT "traits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "creature_races" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "creature_races_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "damage_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "damage_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "challenge_rating_metadata" (
    "cr" "challenge_rating_enum" NOT NULL,
    "display" TEXT NOT NULL,
    "numeric" DOUBLE PRECISION NOT NULL,
    "xp_reward" INTEGER NOT NULL,

    CONSTRAINT "challenge_rating_metadata_pkey" PRIMARY KEY ("cr")
);

-- CreateTable
CREATE TABLE "generation_requests" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "danger" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "generation_requests_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpt_message_histories" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "gpt_message_histories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gpt_messages" (
    "message_history_id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "text" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "gpt_messages_pkey" PRIMARY KEY ("message_history_id","number")
);

-- CreateTable
CREATE TABLE "_creature_biomes" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_biomes_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_languages" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_creature_languages_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_traits" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_creature_traits_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_actions" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_actions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_races_actions" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_creature_races_actions_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_races_traits" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_creature_races_traits_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_adventure_keywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_adventure_keywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "sizes_name_key" ON "sizes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sources_short_name_key" ON "sources"("short_name");

-- CreateIndex
CREATE UNIQUE INDEX "languages_name_key" ON "languages"("name");

-- CreateIndex
CREATE UNIQUE INDEX "biomes_short_name_key" ON "biomes"("short_name");

-- CreateIndex
CREATE UNIQUE INDEX "biomes_name_key" ON "biomes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "types_name_key" ON "types"("name");

-- CreateIndex
CREATE UNIQUE INDEX "alignments_name_key" ON "alignments"("name");

-- CreateIndex
CREATE UNIQUE INDEX "creature_stat_details_creature_stats_id_ability_key" ON "creature_stat_details"("creature_stats_id", "ability");

-- CreateIndex
CREATE UNIQUE INDEX "creature_skill_details_creature_skills_id_skill_key" ON "creature_skill_details"("creature_skills_id", "skill");

-- CreateIndex
CREATE UNIQUE INDEX "creature_senses_creature_id_key" ON "creature_senses"("creature_id");

-- CreateIndex
CREATE UNIQUE INDEX "actions_description_key" ON "actions"("description");

-- CreateIndex
CREATE UNIQUE INDEX "traits_description_key" ON "traits"("description");

-- CreateIndex
CREATE UNIQUE INDEX "damage_types_name_key" ON "damage_types"("name");

-- CreateIndex
CREATE INDEX "_creature_biomes_B_index" ON "_creature_biomes"("B");

-- CreateIndex
CREATE INDEX "_creature_languages_B_index" ON "_creature_languages"("B");

-- CreateIndex
CREATE INDEX "_creature_traits_B_index" ON "_creature_traits"("B");

-- CreateIndex
CREATE INDEX "_creature_actions_B_index" ON "_creature_actions"("B");

-- CreateIndex
CREATE INDEX "_creature_races_actions_B_index" ON "_creature_races_actions"("B");

-- CreateIndex
CREATE INDEX "_creature_races_traits_B_index" ON "_creature_races_traits"("B");

-- CreateIndex
CREATE INDEX "_adventure_keywords_B_index" ON "_adventure_keywords"("B");

-- AddForeignKey
ALTER TABLE "creature_speeds" ADD CONSTRAINT "creature_speeds_id_fkey" FOREIGN KEY ("id") REFERENCES "creatures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creature_stats" ADD CONSTRAINT "creature_stats_id_fkey" FOREIGN KEY ("id") REFERENCES "creatures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creature_stat_details" ADD CONSTRAINT "creature_stat_details_creature_stats_id_fkey" FOREIGN KEY ("creature_stats_id") REFERENCES "creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creature_skills" ADD CONSTRAINT "creature_skills_id_fkey" FOREIGN KEY ("id") REFERENCES "creatures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creature_skill_details" ADD CONSTRAINT "creature_skill_details_creature_skills_id_fkey" FOREIGN KEY ("creature_skills_id") REFERENCES "creature_skills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_alignment_id_fkey" FOREIGN KEY ("alignment_id") REFERENCES "alignments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "creature_races"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_size_fkey" FOREIGN KEY ("size") REFERENCES "sizes"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "creature_senses" ADD CONSTRAINT "creature_senses_creature_id_fkey" FOREIGN KEY ("creature_id") REFERENCES "creatures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "gpt_messages" ADD CONSTRAINT "gpt_messages_message_history_id_fkey" FOREIGN KEY ("message_history_id") REFERENCES "gpt_message_histories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_biomes" ADD CONSTRAINT "_creature_biomes_A_fkey" FOREIGN KEY ("A") REFERENCES "biomes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_biomes" ADD CONSTRAINT "_creature_biomes_B_fkey" FOREIGN KEY ("B") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_resistances" ADD CONSTRAINT "_creature_resistances_A_fkey" FOREIGN KEY ("A") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_resistances" ADD CONSTRAINT "_creature_resistances_B_fkey" FOREIGN KEY ("B") REFERENCES "damage_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_immunities" ADD CONSTRAINT "_creature_immunities_A_fkey" FOREIGN KEY ("A") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_immunities" ADD CONSTRAINT "_creature_immunities_B_fkey" FOREIGN KEY ("B") REFERENCES "damage_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_vulnerabilities" ADD CONSTRAINT "_creature_vulnerabilities_A_fkey" FOREIGN KEY ("A") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_vulnerabilities" ADD CONSTRAINT "_creature_vulnerabilities_B_fkey" FOREIGN KEY ("B") REFERENCES "damage_types"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_languages" ADD CONSTRAINT "_creature_languages_A_fkey" FOREIGN KEY ("A") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_languages" ADD CONSTRAINT "_creature_languages_B_fkey" FOREIGN KEY ("B") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_traits" ADD CONSTRAINT "_creature_traits_A_fkey" FOREIGN KEY ("A") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_traits" ADD CONSTRAINT "_creature_traits_B_fkey" FOREIGN KEY ("B") REFERENCES "traits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_actions" ADD CONSTRAINT "_creature_actions_A_fkey" FOREIGN KEY ("A") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_actions" ADD CONSTRAINT "_creature_actions_B_fkey" FOREIGN KEY ("B") REFERENCES "creatures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_races_actions" ADD CONSTRAINT "_creature_races_actions_A_fkey" FOREIGN KEY ("A") REFERENCES "actions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_races_actions" ADD CONSTRAINT "_creature_races_actions_B_fkey" FOREIGN KEY ("B") REFERENCES "creature_races"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_races_traits" ADD CONSTRAINT "_creature_races_traits_A_fkey" FOREIGN KEY ("A") REFERENCES "creature_races"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_races_traits" ADD CONSTRAINT "_creature_races_traits_B_fkey" FOREIGN KEY ("B") REFERENCES "traits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adventure_keywords" ADD CONSTRAINT "_adventure_keywords_A_fkey" FOREIGN KEY ("A") REFERENCES "adventures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_adventure_keywords" ADD CONSTRAINT "_adventure_keywords_B_fkey" FOREIGN KEY ("B") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
