/*
  Warnings:

  - You are about to drop the column `biome_id` on the `Creature` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Biome` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Type` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Creature" DROP COLUMN "biome_id",
ADD COLUMN     "biomes_ids" INTEGER[];

-- CreateIndex
CREATE UNIQUE INDEX "Biome_title_key" ON "Biome"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Type_name_key" ON "Type"("name");
