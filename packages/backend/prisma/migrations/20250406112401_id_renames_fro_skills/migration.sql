/*
  Warnings:

  - The primary key for the `AcrobaticsSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `AcrobaticsSkill` table. All the data in the column will be lost.
  - The primary key for the `AnimalHandlingSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `AnimalHandlingSkill` table. All the data in the column will be lost.
  - The primary key for the `ArcanaSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `ArcanaSkill` table. All the data in the column will be lost.
  - The primary key for the `DeceptionSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `DeceptionSkill` table. All the data in the column will be lost.
  - The primary key for the `HistorySkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `HistorySkill` table. All the data in the column will be lost.
  - The primary key for the `InsightSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `InsightSkill` table. All the data in the column will be lost.
  - The primary key for the `IntimidationSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `IntimidationSkill` table. All the data in the column will be lost.
  - The primary key for the `InvestigationSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `InvestigationSkill` table. All the data in the column will be lost.
  - The primary key for the `MedicineSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `MedicineSkill` table. All the data in the column will be lost.
  - The primary key for the `NatureSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `NatureSkill` table. All the data in the column will be lost.
  - The primary key for the `PerceptionSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `PerceptionSkill` table. All the data in the column will be lost.
  - The primary key for the `PerformanceSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `PerformanceSkill` table. All the data in the column will be lost.
  - The primary key for the `PersuasionSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `PersuasionSkill` table. All the data in the column will be lost.
  - The primary key for the `ReligionSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `ReligionSkill` table. All the data in the column will be lost.
  - The primary key for the `SleightOfHandSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `SleightOfHandSkill` table. All the data in the column will be lost.
  - The primary key for the `StealthSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `StealthSkill` table. All the data in the column will be lost.
  - The primary key for the `SurvivalSkill` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `skill_list_id` on the `SurvivalSkill` table. All the data in the column will be lost.
  - Added the required column `id` to the `AcrobaticsSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `AnimalHandlingSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `ArcanaSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `DeceptionSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `HistorySkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `InsightSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `IntimidationSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `InvestigationSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `MedicineSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `NatureSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PerceptionSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PerformanceSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `PersuasionSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `ReligionSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SleightOfHandSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `StealthSkill` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `SurvivalSkill` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AcrobaticsSkill" DROP CONSTRAINT "AcrobaticsSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "AnimalHandlingSkill" DROP CONSTRAINT "AnimalHandlingSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "ArcanaSkill" DROP CONSTRAINT "ArcanaSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "DeceptionSkill" DROP CONSTRAINT "DeceptionSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "HistorySkill" DROP CONSTRAINT "HistorySkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "InsightSkill" DROP CONSTRAINT "InsightSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "IntimidationSkill" DROP CONSTRAINT "IntimidationSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "InvestigationSkill" DROP CONSTRAINT "InvestigationSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "MedicineSkill" DROP CONSTRAINT "MedicineSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "NatureSkill" DROP CONSTRAINT "NatureSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "PerceptionSkill" DROP CONSTRAINT "PerceptionSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "PerformanceSkill" DROP CONSTRAINT "PerformanceSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "PersuasionSkill" DROP CONSTRAINT "PersuasionSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "ReligionSkill" DROP CONSTRAINT "ReligionSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "SleightOfHandSkill" DROP CONSTRAINT "SleightOfHandSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "StealthSkill" DROP CONSTRAINT "StealthSkill_skill_list_id_fkey";

-- DropForeignKey
ALTER TABLE "SurvivalSkill" DROP CONSTRAINT "SurvivalSkill_skill_list_id_fkey";

-- AlterTable
ALTER TABLE "AcrobaticsSkill" DROP CONSTRAINT "AcrobaticsSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AcrobaticsSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "AnimalHandlingSkill" DROP CONSTRAINT "AnimalHandlingSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "AnimalHandlingSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ArcanaSkill" DROP CONSTRAINT "ArcanaSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ArcanaSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "DeceptionSkill" DROP CONSTRAINT "DeceptionSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DeceptionSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "HistorySkill" DROP CONSTRAINT "HistorySkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "HistorySkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InsightSkill" DROP CONSTRAINT "InsightSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "InsightSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "IntimidationSkill" DROP CONSTRAINT "IntimidationSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "IntimidationSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "InvestigationSkill" DROP CONSTRAINT "InvestigationSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "InvestigationSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MedicineSkill" DROP CONSTRAINT "MedicineSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "MedicineSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "NatureSkill" DROP CONSTRAINT "NatureSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "NatureSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PerceptionSkill" DROP CONSTRAINT "PerceptionSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PerceptionSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PerformanceSkill" DROP CONSTRAINT "PerformanceSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PerformanceSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "PersuasionSkill" DROP CONSTRAINT "PersuasionSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "PersuasionSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "ReligionSkill" DROP CONSTRAINT "ReligionSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ReligionSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SleightOfHandSkill" DROP CONSTRAINT "SleightOfHandSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SleightOfHandSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "StealthSkill" DROP CONSTRAINT "StealthSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "StealthSkill_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "SurvivalSkill" DROP CONSTRAINT "SurvivalSkill_pkey",
DROP COLUMN "skill_list_id",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "SurvivalSkill_pkey" PRIMARY KEY ("id");

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
