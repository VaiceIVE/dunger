-- CreateEnum
CREATE TYPE "Damage_type" AS ENUM ('Acid', 'Bludgeoning', 'Cold', 'Fire', 'Force', 'Lightning', 'Necrotic', 'Piercing', 'Poison', 'Psychic', 'Radiant', 'Slashing', 'Thunder');

-- CreateTable
CREATE TABLE "Size" (
    "size_key" TEXT NOT NULL,
    "size_name" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("size_key")
);

-- CreateTable
CREATE TABLE "Source" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Source_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Biome" (
    "id" SERIAL NOT NULL,
    "key" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Biome_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alignment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Alignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Speed_stat" (
    "id" TEXT NOT NULL,
    "walk" INTEGER,
    "fly" INTEGER,
    "swim" INTEGER,
    "burrow" INTEGER,
    "climb" INTEGER,

    CONSTRAINT "Speed_stat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature_stats" (
    "id" TEXT NOT NULL,
    "str" INTEGER NOT NULL,
    "dex" INTEGER NOT NULL,
    "con" INTEGER NOT NULL,
    "int" INTEGER NOT NULL,
    "wis" INTEGER NOT NULL,
    "cha" INTEGER NOT NULL,

    CONSTRAINT "Creature_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Skills" (
    "id" TEXT NOT NULL,
    "athletics" INTEGER,
    "acrobatics" INTEGER,
    "sleight_of_hand" INTEGER,
    "stealth" INTEGER,
    "arcana" INTEGER,
    "history" INTEGER,
    "investigation" INTEGER,
    "nature" INTEGER,
    "religion" INTEGER,
    "animal_handling" INTEGER,
    "insight" INTEGER,
    "medicine" INTEGER,
    "perception" INTEGER,
    "survival" INTEGER,
    "deception" INTEGER,
    "intimidation" INTEGER,
    "performance" INTEGER,
    "persuasion" INTEGER,

    CONSTRAINT "Skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creature" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image_uri" TEXT,
    "description" TEXT,
    "size" TEXT,
    "type_id" INTEGER,
    "soirce_id" INTEGER,
    "alignment_id" INTEGER,
    "armor_class" INTEGER,
    "hit_points" INTEGER,
    "resistances" "Damage_type"[],
    "immunities" "Damage_type"[],
    "vunlerabilities" "Damage_type"[],
    "passive_perception" INTEGER,
    "challenge_rating" TEXT NOT NULL,
    "biome_id" INTEGER,
    "sType" INTEGER,
    "aSubTypes" TEXT[],

    CONSTRAINT "Creature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Action" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "attack" TEXT,

    CONSTRAINT "Action_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trait" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "attack" TEXT,

    CONSTRAINT "Trait_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreatureRace" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CreatureRace_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GenrationRequest" (
    "id" SERIAL NOT NULL,
    "request" TEXT NOT NULL,
    "danger" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GenrationRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CreatureToLanguage" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureToLanguage_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CreatureToTrait" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureToTrait_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActionToCreature" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ActionToCreature_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ActionToCreatureRace" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ActionToCreatureRace_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CreatureRaceToTrait" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CreatureRaceToTrait_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Size_size_name_key" ON "Size"("size_name");

-- CreateIndex
CREATE UNIQUE INDEX "Source_key_key" ON "Source"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Biome_key_key" ON "Biome"("key");

-- CreateIndex
CREATE UNIQUE INDEX "Alignment_name_key" ON "Alignment"("name");

-- CreateIndex
CREATE INDEX "_CreatureToLanguage_B_index" ON "_CreatureToLanguage"("B");

-- CreateIndex
CREATE INDEX "_CreatureToTrait_B_index" ON "_CreatureToTrait"("B");

-- CreateIndex
CREATE INDEX "_ActionToCreature_B_index" ON "_ActionToCreature"("B");

-- CreateIndex
CREATE INDEX "_ActionToCreatureRace_B_index" ON "_ActionToCreatureRace"("B");

-- CreateIndex
CREATE INDEX "_CreatureRaceToTrait_B_index" ON "_CreatureRaceToTrait"("B");

-- AddForeignKey
ALTER TABLE "Speed_stat" ADD CONSTRAINT "Speed_stat_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature_stats" ADD CONSTRAINT "Creature_stats_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Skills" ADD CONSTRAINT "Skills_id_fkey" FOREIGN KEY ("id") REFERENCES "Creature"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_alignment_id_fkey" FOREIGN KEY ("alignment_id") REFERENCES "Alignment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_type_id_fkey" FOREIGN KEY ("type_id") REFERENCES "CreatureRace"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_sType_fkey" FOREIGN KEY ("sType") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_size_fkey" FOREIGN KEY ("size") REFERENCES "Size"("size_name") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_biome_id_fkey" FOREIGN KEY ("biome_id") REFERENCES "Biome"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Creature" ADD CONSTRAINT "Creature_soirce_id_fkey" FOREIGN KEY ("soirce_id") REFERENCES "Source"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToLanguage" ADD CONSTRAINT "_CreatureToLanguage_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToLanguage" ADD CONSTRAINT "_CreatureToLanguage_B_fkey" FOREIGN KEY ("B") REFERENCES "Language"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToTrait" ADD CONSTRAINT "_CreatureToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureToTrait" ADD CONSTRAINT "_CreatureToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreature" ADD CONSTRAINT "_ActionToCreature_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreature" ADD CONSTRAINT "_ActionToCreature_B_fkey" FOREIGN KEY ("B") REFERENCES "Creature"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreatureRace" ADD CONSTRAINT "_ActionToCreatureRace_A_fkey" FOREIGN KEY ("A") REFERENCES "Action"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ActionToCreatureRace" ADD CONSTRAINT "_ActionToCreatureRace_B_fkey" FOREIGN KEY ("B") REFERENCES "CreatureRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureRaceToTrait" ADD CONSTRAINT "_CreatureRaceToTrait_A_fkey" FOREIGN KEY ("A") REFERENCES "CreatureRace"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CreatureRaceToTrait" ADD CONSTRAINT "_CreatureRaceToTrait_B_fkey" FOREIGN KEY ("B") REFERENCES "Trait"("id") ON DELETE CASCADE ON UPDATE CASCADE;
