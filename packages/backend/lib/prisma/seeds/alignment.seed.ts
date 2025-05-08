import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedAlignment() {
  const filePath = resolve(import.meta.dirname, '../data/creatures_data.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const creatures: {
    alignment: string;
  }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  const alignments = Array.from(new Set(creatures.map((x) => x.alignment)));

  for (const alignment of alignments) {
    const normalizedName = alignment.trim().toLowerCase();

    promises.push(
      prisma.alignment
        .upsert({
          where: { name: normalizedName },
          update: {},
          create: {
            name: alignment
          }
        })
        .catch((error) => {
          // console.error(`Failed to upsert alignment "${alignment}":`, error);
        })
    );
  }
  Promise.all(promises).then(() => {
    return 1;
  });
}
