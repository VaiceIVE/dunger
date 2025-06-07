/*
  Warnings:

  - You are about to drop the `generation_requests` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gpt_message_histories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `gpt_messages` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CreatureRole" AS ENUM ('OFFENCE', 'DEFENCE');

-- DropForeignKey
ALTER TABLE "gpt_messages" DROP CONSTRAINT "gpt_messages_message_history_id_fkey";

-- DropTable
DROP TABLE "generation_requests";

-- DropTable
DROP TABLE "gpt_message_histories";

-- DropTable
DROP TABLE "gpt_messages";

-- CreateTable
CREATE TABLE "gpt_creature_request" (
    "id" SERIAL NOT NULL,
    "creature_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "challenge_rating" TEXT NOT NULL,
    "type_name" TEXT NOT NULL,
    "creation_description" TEXT,
    "role" "CreatureRole",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "gpt_creature_request_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "gpt_creature_request_creature_id_key" ON "gpt_creature_request"("creature_id");

-- AddForeignKey
ALTER TABLE "gpt_creature_request" ADD CONSTRAINT "gpt_creature_request_creature_id_fkey" FOREIGN KEY ("creature_id") REFERENCES "creatures"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
