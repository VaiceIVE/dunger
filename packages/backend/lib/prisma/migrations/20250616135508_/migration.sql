/*
  Warnings:

  - You are about to drop the column `createdAt` on the `gpt_creature_request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "gpt_creature_request" DROP COLUMN "createdAt",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "magic_items" ADD COLUMN     "creator_id" TEXT;
