/*
  Warnings:

  - Added the required column `order` to the `magic_item_rarities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "magic_item_rarities" ADD COLUMN     "order" INTEGER NOT NULL;
