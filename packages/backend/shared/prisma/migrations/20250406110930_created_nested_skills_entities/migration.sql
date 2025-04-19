/*
  Warnings:

  - You are about to drop the column `acrobatics` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `animal_handling` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `arcana` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `athletics` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `deception` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `history` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `insight` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `intimidation` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `investigation` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `medicine` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `nature` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `perception` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `performance` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `persuasion` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `religion` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `sleight_of_hand` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `stealth` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the column `survival` on the `SkillsList` table. All the data in the column will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "SkillsList" DROP COLUMN "acrobatics",
DROP COLUMN "animal_handling",
DROP COLUMN "arcana",
DROP COLUMN "athletics",
DROP COLUMN "deception",
DROP COLUMN "history",
DROP COLUMN "insight",
DROP COLUMN "intimidation",
DROP COLUMN "investigation",
DROP COLUMN "medicine",
DROP COLUMN "nature",
DROP COLUMN "perception",
DROP COLUMN "performance",
DROP COLUMN "persuasion",
DROP COLUMN "religion",
DROP COLUMN "sleight_of_hand",
DROP COLUMN "stealth",
DROP COLUMN "survival";

-- DropTable
DROP TABLE "Skill";

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
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Акробатика',

    CONSTRAINT "AcrobaticsSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "SleightOfHandSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Ловкость рук',

    CONSTRAINT "SleightOfHandSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "StealthSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Скрытность',

    CONSTRAINT "StealthSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "ArcanaSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Магия',

    CONSTRAINT "ArcanaSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "HistorySkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'История',

    CONSTRAINT "HistorySkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "InvestigationSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Расследование',

    CONSTRAINT "InvestigationSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "NatureSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Природа',

    CONSTRAINT "NatureSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "ReligionSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Религия',

    CONSTRAINT "ReligionSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "AnimalHandlingSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Уход за животными',

    CONSTRAINT "AnimalHandlingSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "InsightSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Проницательность',

    CONSTRAINT "InsightSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "MedicineSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Медицина',

    CONSTRAINT "MedicineSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "PerceptionSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Восприятие',

    CONSTRAINT "PerceptionSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "SurvivalSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Выживание',

    CONSTRAINT "SurvivalSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "DeceptionSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Обман',

    CONSTRAINT "DeceptionSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "IntimidationSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Запугивание',

    CONSTRAINT "IntimidationSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "PerformanceSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Исполнение',

    CONSTRAINT "PerformanceSkill_pkey" PRIMARY KEY ("skill_list_id")
);

-- CreateTable
CREATE TABLE "PersuasionSkill" (
    "skill_list_id" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "mastery" BOOLEAN NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'Соблазнение',

    CONSTRAINT "PersuasionSkill_pkey" PRIMARY KEY ("skill_list_id")
);

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
ALTER TABLE "AcrobaticsSkill" ADD CONSTRAINT "AcrobaticsSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SleightOfHandSkill" ADD CONSTRAINT "SleightOfHandSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StealthSkill" ADD CONSTRAINT "StealthSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "DexterityBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArcanaSkill" ADD CONSTRAINT "ArcanaSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistorySkill" ADD CONSTRAINT "HistorySkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvestigationSkill" ADD CONSTRAINT "InvestigationSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NatureSkill" ADD CONSTRAINT "NatureSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReligionSkill" ADD CONSTRAINT "ReligionSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "IntellengenceBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AnimalHandlingSkill" ADD CONSTRAINT "AnimalHandlingSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InsightSkill" ADD CONSTRAINT "InsightSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MedicineSkill" ADD CONSTRAINT "MedicineSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerceptionSkill" ADD CONSTRAINT "PerceptionSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SurvivalSkill" ADD CONSTRAINT "SurvivalSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "WisdomBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeceptionSkill" ADD CONSTRAINT "DeceptionSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IntimidationSkill" ADD CONSTRAINT "IntimidationSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PerformanceSkill" ADD CONSTRAINT "PerformanceSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PersuasionSkill" ADD CONSTRAINT "PersuasionSkill_skill_list_id_fkey" FOREIGN KEY ("skill_list_id") REFERENCES "CharismaBasedSkills"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
