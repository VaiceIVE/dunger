/*
  Warnings:

  - The primary key for the `DamageType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `DamageType` table. All the data in the column will be lost.
  - The primary key for the `Size` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `key` on the `Size` table. All the data in the column will be lost.
  - Added the required column `id` to the `DamageType` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `Size` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DamageType" DROP CONSTRAINT "DamageType_pkey",
DROP COLUMN "key",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "DamageType_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Size" DROP CONSTRAINT "Size_pkey",
DROP COLUMN "key",
ADD COLUMN     "id" TEXT NOT NULL,
ADD CONSTRAINT "Size_pkey" PRIMARY KEY ("id");
