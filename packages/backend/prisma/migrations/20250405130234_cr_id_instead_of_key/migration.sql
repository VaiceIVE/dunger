/*
  Warnings:

  - The primary key for the `ChallengeRating` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `ChallengeRating` table. All the data in the column will be lost.
  - Added the required column `id` to the `ChallengeRating` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ChallengeRating" DROP CONSTRAINT "ChallengeRating_pkey",
DROP COLUMN "key",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "ChallengeRating_pkey" PRIMARY KEY ("id");
