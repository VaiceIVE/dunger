/*
  Warnings:

  - You are about to drop the `Skills` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Language` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "Stat" AS ENUM ('Strength', 'Dexterity', 'Constitution', 'Intelegence', 'Wisdom', 'Charisma');

-- DropForeignKey
ALTER TABLE "Skills" DROP CONSTRAINT "Skills_id_fkey";

-- DropTable
DROP TABLE "Skills";

-- CreateTable
CREATE TABLE "SkillsList" (
    "id" TEXT NOT NULL,
    "athletics" INTEGER,
    "acrobatics" INTEGER,
    "sleight_of_hand" INTEGER,
    "stealth" INTEGER,
    "arcana" INTEGER,
    "history" INTEGER,
    "investigation" INTEGER,
    "nature" INTEGER,
    "religion" INTEGER,
    "animal_handling" INTEGER,
    "insight" INTEGER,
    "medicine" INTEGER,
    "perception" INTEGER,
    "survival" INTEGER,
    "deception" INTEGER,
    "intimidation" INTEGER,
    "performance" INTEGER,
    "persuasion" INTEGER,

    CONSTRAINT "SkillsList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skill" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "stat" "Stat" NOT NULL,

    CONSTRAINT "Skill_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DamageType" (
    "key" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DamageType_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "Skill_name_key" ON "Skill"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Language_name_key" ON "Language"("name");

-- AddForeignKey
ALTER TABLE "SkillsList" ADD CONSTRAINT "SkillsList_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
