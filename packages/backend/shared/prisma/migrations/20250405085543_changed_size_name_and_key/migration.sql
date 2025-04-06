/*
  Warnings:

  - The primary key for the `Size` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `size_key` on the `Size` table. All the data in the column will be lost.
  - You are about to drop the column `size_name` on the `Size` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Size` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `key` to the `Size` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_size_fkey";

-- DropIndex
DROP INDEX "Size_size_name_key";

-- AlterTable
ALTER TABLE "Size" DROP CONSTRAINT "Size_pkey",
DROP COLUMN "size_key",
DROP COLUMN "size_name",
ADD COLUMN     "key" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD CONSTRAINT "Size_pkey" PRIMARY KEY ("key");

-- CreateIndex
CREATE UNIQUE INDEX "Size_name_key" ON "Size"("name");

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_size_fkey" FOREIGN KEY ("size") REFERENCES "Size"("name") ON DELETE SET NULL ON UPDATE CASCADE;
