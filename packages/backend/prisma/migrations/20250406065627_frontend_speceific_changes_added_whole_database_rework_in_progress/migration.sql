/*
  Warnings:

  - You are about to drop the column `text` on the `Action` table. All the data in the column will be lost.
  - You are about to drop the column `immunities` on the `Creature` table. All the data in the column will be lost.
  - You are about to drop the column `passive_perception` on the `Creature` table. All the data in the column will be lost.
  - You are about to drop the column `resistances` on the `Creature` table. All the data in the column will be lost.
  - You are about to drop the column `type_id` on the `Creature` table. All the data in the column will be lost.
  - You are about to drop the column `vunlerabilities` on the `Creature` table. All the data in the column will be lost.
  - You are about to drop the column `cha` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `con` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `dex` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `int` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `str` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `wis` on the `Creature_stats` table. All the data in the column will be lost.
  - You are about to drop the column `text` on the `Trait` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[description]` on the table `Action` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[description]` on the table `Trait` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Trait` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_biome_id_fkey";

-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_type_id_fkey";

-- AlterTable
ALTER TABLE "Action" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Creature" DROP COLUMN "immunities",
DROP COLUMN "passive_perception",
DROP COLUMN "resistances",
DROP COLUMN "type_id",
DROP COLUMN "vunlerabilities",
ADD COLUMN     "race_id" INTEGER;

-- AlterTable
ALTER TABLE "Creature_stats" DROP COLUMN "cha",
DROP COLUMN "con",
DROP COLUMN "dex",
DROP COLUMN "int",
DROP COLUMN "str",
DROP COLUMN "wis";

-- AlterTable
ALTER TABLE "Trait" DROP COLUMN "text",
ADD COLUMN     "description" TEXT NOT NULL;

-- DropEnum
DROP TYPE "Damage_type";

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
CREATE TABLE "Senses" (
    "creature_id" TEXT NOT NULL,
    "passive_perception" INTEGER,

    CONSTRAINT "Senses_pkey" PRIMARY KEY ("creature_id")
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
CREATE TABLE "_creature_vunlerabilities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_creature_vunlerabilities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_BiomeToCreature_B_index" ON "_BiomeToCreature"("B");

-- CreateIndex
CREATE INDEX "_creature_resistances_B_index" ON "_creature_resistances"("B");

-- CreateIndex
CREATE INDEX "_creature_immunities_B_index" ON "_creature_immunities"("B");

-- CreateIndex
CREATE INDEX "_creature_vunlerabilities_B_index" ON "_creature_vunlerabilities"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Action_description_key" ON "Action"("description");

-- CreateIndex
CREATE UNIQUE INDEX "Trait_description_key" ON "Trait"("description");

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
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_race_id_fkey" FOREIGN KEY ("race_id") REFERENCES "CreatureRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Senses" ADD CONSTRAINT "Senses_creature_id_fkey" FOREIGN KEY ("creature_id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

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
ALTER TABLE "_creature_vunlerabilities" ADD CONSTRAINT "_creature_vunlerabilities_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_creature_vunlerabilities" ADD CONSTRAINT "_creature_vunlerabilities_B_fkey" FOREIGN KEY ("B") REFERENCES "DamageType"("id") ON DELETE CASCADE ON UPDATE CASCADE;
