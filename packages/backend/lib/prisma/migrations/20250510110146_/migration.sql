-- CreateEnum
CREATE TYPE "Stat" AS ENUM ('Strength', 'Dexterity', 'Constitution', 'Intelegence', 'Wisdom', 'Charisma');

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "shortName" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biome" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Biome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alignment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Alignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speed_stat" (
    "id" TEXT NOT NULL,
    "walk" INTEGER,
    "fly" INTEGER,
    "swim" INTEGER,
    "burrow" INTEGER,
    "climb" INTEGER,

    CONSTRAINT "Speed_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature_stats" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Creature_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Strength_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "Strength_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "Dexterity_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "Dexterity_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "Constitution_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "Constitution_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "intelligence_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "intelligence_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "Wisdom_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "Wisdom_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "Charisma_stat_details" (
    "statblock_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,

    CONSTRAINT "Charisma_stat_details_pkey" PRIMARY KEY ("statblock_id")
);

-- CreateTable
CREATE TABLE "SkillsList" (
    "id" TEXT NOT NULL,

    CONSTRAINT "SkillsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrengthBasedSkills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "StrengthBasedSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DexterityBasedSkills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "DexterityBasedSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntellengenceBasedSkills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "IntellengenceBasedSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WisdomBasedSkills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "WisdomBasedSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharismaBasedSkills" (
    "id" TEXT NOT NULL,

    CONSTRAINT "CharismaBasedSkills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AthleticsSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Атлетика',

    CONSTRAINT "AthleticsSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AcrobaticsSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Акробатика',

    CONSTRAINT "AcrobaticsSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SleightOfHandSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Ловкость рук',

    CONSTRAINT "SleightOfHandSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StealthSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Скрытность',

    CONSTRAINT "StealthSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArcanaSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Магия',

    CONSTRAINT "ArcanaSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistorySkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'История',

    CONSTRAINT "HistorySkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvestigationSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Расследование',

    CONSTRAINT "InvestigationSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NatureSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Природа',

    CONSTRAINT "NatureSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ReligionSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Религия',

    CONSTRAINT "ReligionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AnimalHandlingSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Уход за животными',

    CONSTRAINT "AnimalHandlingSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InsightSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Проницательность',

    CONSTRAINT "InsightSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MedicineSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Медицина',

    CONSTRAINT "MedicineSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerceptionSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Восприятие',

    CONSTRAINT "PerceptionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SurvivalSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Выживание',

    CONSTRAINT "SurvivalSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeceptionSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Обман',

    CONSTRAINT "DeceptionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "IntimidationSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Запугивание',

    CONSTRAINT "IntimidationSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PerformanceSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Исполнение',

    CONSTRAINT "PerformanceSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersuasionSkill" (
    "id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Соблазнение',

    CONSTRAINT "PersuasionSkill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_uri" TEXT,
    "description" TEXT,
    "size" TEXT,
    "race_id" INTEGER,
    "source_id" INTEGER,
    "alignment_id" INTEGER,
    "armor_class" INTEGER,
    "hit_points" INTEGER,
    "challenge_rating" TEXT NOT NULL,
    "biomes_ids" INTEGER[],
    "type_id" INTEGER,
    "aSubTypes" TEXT[],

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Senses" (
    "creature_id" TEXT NOT NULL,
    "passive_perception" INTEGER,

    CONSTRAINT "Senses_pkey" PRIMARY KEY ("creature_id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attack" TEXT,
    "is_template" BOOLEAN,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "attack" TEXT,
    "is_template" BOOLEAN,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureRace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CreatureRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenrationRequest" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "danger" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GenrationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageType" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DamageType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChallengeRating" (
    "id" TEXT NOT NULL,

    CONSTRAINT "ChallengeRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPTMessageHistory" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "GPTMessageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPTMessage" (
    "number" INTEGER NOT NULL,
    "message_history_id" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "GPTMessage_pkey" PRIMARY KEY ("message_history_id","number")
);

-- CreateTable
CREATE TABLE "_BiomeToCreature" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BiomeToCreature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_resistances" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_resistances_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_immunities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_immunities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_creature_vulnerabilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_vulnerabilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CreatureToLanguage" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureToLanguage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CreatureToTrait" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureToTrait_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActionToCreature" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActionToCreature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActionToCreatureRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActionToCreatureRace_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CreatureRaceToTrait" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureRaceToTrait_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_shortName_key" ON "Source"("shortName");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Biome_key_key" ON "Biome"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Biome_title_key" ON "Biome"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Alignment_name_key" ON "Alignment"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Action_description_key" ON "Action"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Trait_description_key" ON "Trait"("description");

-- CreateIndex
CREATE UNIQUE INDEX "DamageType_name_key" ON "DamageType"("name");

-- CreateIndex
CREATE INDEX "_BiomeToCreature_B_index" ON "_BiomeToCreature"("B");

-- CreateIndex
CREATE INDEX "_creature_resistances_B_index" ON "_creature_resistances"("B");

-- CreateIndex
CREATE INDEX "_creature_immunities_B_index" ON "_creature_immunities"("B");

-- CreateIndex
CREATE INDEX "_creature_vulnerabilities_B_index" ON "_creature_vulnerabilities"("B");

-- CreateIndex
CREATE INDEX "_CreatureToLanguage_B_index" ON "_CreatureToLanguage"("B");

-- CreateIndex
CREATE INDEX "_CreatureToTrait_B_index" ON "_CreatureToTrait"("B");

-- CreateIndex
CREATE INDEX "_ActionToCreature_B_index" ON "_ActionToCreature"("B");

-- CreateIndex
CREATE INDEX "_ActionToCreatureRace_B_index" ON "_ActionToCreatureRace"("B");

-- CreateIndex
CREATE INDEX "_CreatureRaceToTrait_B_index" ON "_CreatureRaceToTrait"("B");

-- AddForeignKey
ALTER TABLE "Speed_stat" ADD CONSTRAINT "Speed_stat_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature_stats" ADD CONSTRAINT "Creature_stats_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Strength_stat_details" ADD CONSTRAINT "Strength_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dexterity_stat_details" ADD CONSTRAINT "Dexterity_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Constitution_stat_details" ADD CONSTRAINT "Constitution_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "intelligence_stat_details" ADD CONSTRAINT "intelligence_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wisdom_stat_details" ADD CONSTRAINT "Wisdom_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Charisma_stat_details" ADD CONSTRAINT "Charisma_stat_details_statblock_id_fkey" FOREIGN KEY ("statblock_id") REFERENCES "Creature_stats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SkillsList" ADD CONSTRAINT "SkillsList_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StrengthBasedSkills" ADD CONSTRAINT "StrengthBasedSkills_id_fkey" FOREIGN KEY ("id") REFERENCES "SkillsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DexterityBasedSkills" ADD CONSTRAINT "DexterityBasedSkills_id_fkey" FOREIGN KEY ("id") REFERENCES "SkillsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntellengenceBasedSkills" ADD CONSTRAINT "IntellengenceBasedSkills_id_fkey" FOREIGN KEY ("id") REFERENCES "SkillsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WisdomBasedSkills" ADD CONSTRAINT "WisdomBasedSkills_id_fkey" FOREIGN KEY ("id") REFERENCES "SkillsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharismaBasedSkills" ADD CONSTRAINT "CharismaBasedSkills_id_fkey" FOREIGN KEY ("id") REFERENCES "SkillsList"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AthleticsSkill" ADD CONSTRAINT "AthleticsSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "StrengthBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AcrobaticsSkill" ADD CONSTRAINT "AcrobaticsSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleightOfHandSkill" ADD CONSTRAINT "SleightOfHandSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StealthSkill" ADD CONSTRAINT "StealthSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcanaSkill" ADD CONSTRAINT "ArcanaSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorySkill" ADD CONSTRAINT "HistorySkill_id_fkey" FOREIGN KEY ("id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationSkill" ADD CONSTRAINT "InvestigationSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NatureSkill" ADD CONSTRAINT "NatureSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReligionSkill" ADD CONSTRAINT "ReligionSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalHandlingSkill" ADD CONSTRAINT "AnimalHandlingSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightSkill" ADD CONSTRAINT "InsightSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineSkill" ADD CONSTRAINT "MedicineSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerceptionSkill" ADD CONSTRAINT "PerceptionSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurvivalSkill" ADD CONSTRAINT "SurvivalSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeceptionSkill" ADD CONSTRAINT "DeceptionSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntimidationSkill" ADD CONSTRAINT "IntimidationSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceSkill" ADD CONSTRAINT "PerformanceSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersuasionSkill" ADD CONSTRAINT "PersuasionSkill_id_fkey" FOREIGN KEY ("id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_alignment_id_fkey" FOREIGN KEY ("alignment_id") REFERENCES "Alignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "CreatureRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_size_fkey" FOREIGN KEY ("size") REFERENCES "Size"("name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Senses" ADD CONSTRAINT "Senses_creature_id_fkey" FOREIGN KEY ("creature_id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPTMessage" ADD CONSTRAINT "GPTMessage_message_history_id_fkey" FOREIGN KEY ("message_history_id") REFERENCES "GPTMessageHistory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BiomeToCreature" ADD CONSTRAINT "_BiomeToCreature_A_fkey" FOREIGN KEY ("A") REFERENCES "Biome"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BiomeToCreature" ADD CONSTRAINT "_BiomeToCreature_B_fkey" FOREIGN KEY ("B") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_resistances" ADD CONSTRAINT "_creature_resistances_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_resistances" ADD CONSTRAINT "_creature_resistances_B_fkey" FOREIGN KEY ("B") REFERENCES "DamageType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_immunities" ADD CONSTRAINT "_creature_immunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_immunities" ADD CONSTRAINT "_creature_immunities_B_fkey" FOREIGN KEY ("B") REFERENCES "DamageType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_vulnerabilities" ADD CONSTRAINT "_creature_vulnerabilities_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_vulnerabilities" ADD CONSTRAINT "_creature_vulnerabilities_B_fkey" FOREIGN KEY ("B") REFERENCES "DamageType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToLanguage" ADD CONSTRAINT "_CreatureToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToLanguage" ADD CONSTRAINT "_CreatureToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToTrait" ADD CONSTRAINT "_CreatureToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToTrait" ADD CONSTRAINT "_CreatureToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreature" ADD CONSTRAINT "_ActionToCreature_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreature" ADD CONSTRAINT "_ActionToCreature_B_fkey" FOREIGN KEY ("B") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreatureRace" ADD CONSTRAINT "_ActionToCreatureRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreatureRace" ADD CONSTRAINT "_ActionToCreatureRace_B_fkey" FOREIGN KEY ("B") REFERENCES "CreatureRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureRaceToTrait" ADD CONSTRAINT "_CreatureRaceToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "CreatureRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureRaceToTrait" ADD CONSTRAINT "_CreatureRaceToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;
