import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedBiomes() {
  const filePath = resolve(import.meta.dirname, '../data/biomes.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const biomes: {
    text: { key: string; name: string };
  }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  for (const biome of biomes) {
    const normalizedKey = biome.text.key.trim().toLowerCase();

    promises.push(
      prisma.biome.upsert({
        where: { short_name: normalizedKey },
        update: {},
        create: {
          short_name: biome.text.key,
          name: biome.text.name
        }
      })
    );
  }

  Promise.all(promises).finally(async () => {
    await prisma.$disconnect();
  });
}
