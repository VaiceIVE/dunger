import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedActions() {
  const filePath = resolve(import.meta.dirname, '../data/actions.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const data: { name: string; text: string; attack: string }[] = JSON.parse(defaultValuesFile);

  for (const action of data) {
    await prisma.action.upsert({
      where: {
        description: action.text
      },
      update: {},
      create: {
        description: action.text,
        name: action.name
      }
    });
  }
}
SeedActions()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
