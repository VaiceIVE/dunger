import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedTraits() {
  const filePath = resolve(import.meta.dirname, '../data/traits.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const data: { name: string; text: string }[] = JSON.parse(defaultValuesFile);

  for (const trait of data) {
    await prisma.trait.upsert({
      where: {
        description: trait.text
      },
      update: {},
      create: {
        description: trait.text,
        name: trait.name
      }
    });
  }
}
SeedTraits()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
