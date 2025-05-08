import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SeedBiomes() {
  const filePath = resolve(import.meta.dirname, '../data/biomes.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const biomes: {
    text: { key: string; title: string };
  }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  for (const biome of biomes) {
    const normalizedKey = biome.text.key.trim().toLowerCase();

    promises.push(
      prisma.biome
        .upsert({
          where: { key: normalizedKey },
          update: {},
          create: {
            key: biome.text.key,
            title: biome.text.title
          }
        })
        .catch((error) => {
          // console.error(`Failed to upsert biome "${biome.text.key}":`, error);
        })
    );
  }

  Promise.all(promises).then(() => {
    return 1;
  });
}
