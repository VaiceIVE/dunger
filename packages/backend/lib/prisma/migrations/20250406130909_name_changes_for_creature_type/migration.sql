/*
  Warnings:

  - You are about to drop the column `sType` on the `Creature` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Creature" DROP CONSTRAINT "Creature_sType_fkey";

-- AlterTable
ALTER TABLE "Creature" DROP COLUMN "sType",
ADD COLUMN     "type_id" INTEGER;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;
