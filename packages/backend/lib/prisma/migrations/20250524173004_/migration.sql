/*
  Warnings:

  - A unique constraint covering the columns `[display]` on the table `challenge_rating_metadata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "challenge_rating_metadata_display_key" ON "challenge_rating_metadata"("display");

-- AddForeignKey
ALTER TABLE "creatures" ADD CONSTRAINT "creatures_challenge_rating_fkey" FOREIGN KEY ("challenge_rating") REFERENCES "challenge_rating_metadata"("display") ON DELETE RESTRICT ON UPDATE CASCADE;
