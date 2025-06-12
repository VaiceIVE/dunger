-- DropForeignKey
ALTER TABLE "magic_items" DROP CONSTRAINT "magic_items_rarity_id_fkey";

-- DropForeignKey
ALTER TABLE "magic_items" DROP CONSTRAINT "magic_items_source_id_fkey";

-- DropForeignKey
ALTER TABLE "magic_items" DROP CONSTRAINT "magic_items_type_id_fkey";

-- AlterTable
ALTER TABLE "magic_items" ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "type_id" DROP NOT NULL,
ALTER COLUMN "rarity_id" DROP NOT NULL,
ALTER COLUMN "source_id" DROP NOT NULL,
ALTER COLUMN "requires_attunement" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "magic_item_types"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_rarity_id_fkey" FOREIGN KEY ("rarity_id") REFERENCES "magic_item_rarities"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magic_items" ADD CONSTRAINT "magic_items_source_id_fkey" FOREIGN KEY ("source_id") REFERENCES "sources"("id") ON DELETE SET NULL ON UPDATE CASCADE;
