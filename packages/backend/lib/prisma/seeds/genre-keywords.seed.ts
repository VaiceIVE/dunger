// prisma/seed.ts

import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedGenreKeywords() {
  const filePath = resolve(import.meta.dirname, '../data/genre-keywords.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const genreKeywords: {
    name: string;
    keywords: string[];
  }[] = JSON.parse(defaultValuesFile);

  for (const { name, keywords } of genreKeywords) {
    const genre = await prisma.genre.create({
      data: { name }
    });

    await prisma.keyword.createMany({
      data: keywords.map((keyword) => ({
        name: keyword,
        genre_id: genre.id
      }))
    });
  }
}
