/*
  Warnings:

  - You are about to drop the column `shortName` on the `Source` table. All the data in the column will be lost.
  - You are about to drop the `Adventure` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Keyword` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[short_name]` on the table `Source` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short_name` to the `Source` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('HE', 'SHE', 'IT');

-- DropForeignKey
ALTER TABLE "Adventure" DROP CONSTRAINT "Adventure_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "Keyword" DROP CONSTRAINT "Keyword_genre_id_fkey";

-- DropForeignKey
ALTER TABLE "_AdventureKeywords" DROP CONSTRAINT "_AdventureKeywords_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdventureKeywords" DROP CONSTRAINT "_AdventureKeywords_B_fkey";

-- DropIndex
DROP INDEX "Source_shortName_key";

-- AlterTable
ALTER TABLE "Source" DROP COLUMN "shortName",
ADD COLUMN     "short_name" TEXT NOT NULL;

-- DropTable
DROP TABLE "Adventure";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Keyword";

-- CreateTable
CREATE TABLE "adventures" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adventures_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_items" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "type_id" TEXT NOT NULL,
    "rarity_id" TEXT NOT NULL,
    "source_id" INTEGER NOT NULL,

    CONSTRAINT "magic_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_item_rarities" (
    "id" TEXT NOT NULL,
    "cost" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "name_he" TEXT NOT NULL,
    "name_she" TEXT NOT NULL,
    "name_it" TEXT NOT NULL,

    CONSTRAINT "magic_item_rarities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_item_types" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "gender" "Gender" NOT NULL,

    CONSTRAINT "magic_item_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attunement_conditions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "attunement_conditions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magic_item_attunements" (
    "magicItemId" TEXT NOT NULL,
    "attunementId" TEXT NOT NULL,

    CONSTRAINT "magic_item_attunements_pkey" PRIMARY KEY ("magicItemId","attunementId")
);

-- CreateIndex
CREATE UNIQUE INDEX "attunement_conditions_name_key" ON "attunement_conditions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_short_name_key" ON "Source"("short_name");

-- AddForeignKey
ALTER TABLE "adventures" ADD CONSTRAINT "adventures_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "magic_item_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "magic_item_rarities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "Source"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_item_attunements" ADD CONSTRAINT "magic_item_attunements_magicItemId_fkey" FOREIGN KEY ("magicItemId") REFERENCES "magic_items"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_item_attunements" ADD CONSTRAINT "magic_item_attunements_attunementId_fkey" FOREIGN KEY ("attunementId") REFERENCES "attunement_conditions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdventureKeywords" ADD CONSTRAINT "_AdventureKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "adventures"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdventureKeywords" ADD CONSTRAINT "_AdventureKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;
