/*
  Warnings:

  - You are about to drop the column `title` on the `Adventure` table. All the data in the column will be lost.
  - You are about to drop the `AdventureKeyword` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Adventure` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "AdventureKeyword" DROP CONSTRAINT "AdventureKeyword_adventure_id_fkey";

-- DropForeignKey
ALTER TABLE "AdventureKeyword" DROP CONSTRAINT "AdventureKeyword_keyword_id_fkey";

-- AlterTable
ALTER TABLE "Adventure" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "AdventureKeyword";

-- CreateTable
CREATE TABLE "_AdventureKeywords" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AdventureKeywords_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_AdventureKeywords_B_index" ON "_AdventureKeywords"("B");

-- AddForeignKey
ALTER TABLE "_AdventureKeywords" ADD CONSTRAINT "_AdventureKeywords_A_fkey" FOREIGN KEY ("A") REFERENCES "Adventure"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdventureKeywords" ADD CONSTRAINT "_AdventureKeywords_B_fkey" FOREIGN KEY ("B") REFERENCES "Keyword"("id") ON DELETE CASCADE ON UPDATE CASCADE;
