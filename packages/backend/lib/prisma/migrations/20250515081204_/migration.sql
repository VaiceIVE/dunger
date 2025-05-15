-- CreateTable
CREATE TABLE "Adventure" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "planned_parties" INTEGER NOT NULL,
    "genre_id" TEXT NOT NULL,
    "creator_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Keyword" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "genre_id" TEXT NOT NULL,

    CONSTRAINT "Keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdventureKeyword" (
    "adventure_id" TEXT NOT NULL,
    "keyword_id" TEXT NOT NULL,

    CONSTRAINT "AdventureKeyword_pkey" PRIMARY KEY ("adventure_id","keyword_id")
);

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Keyword" ADD CONSTRAINT "Keyword_genre_id_fkey" FOREIGN KEY ("genre_id") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdventureKeyword" ADD CONSTRAINT "AdventureKeyword_adventure_id_fkey" FOREIGN KEY ("adventure_id") REFERENCES "Adventure"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdventureKeyword" ADD CONSTRAINT "AdventureKeyword_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "Keyword"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
