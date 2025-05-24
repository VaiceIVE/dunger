import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedTraits() {
  const filePath = resolve(import.meta.dirname, '../data/traits.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const traits: { name: string; text: string; attack: string }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  for (const trait of traits) {
    promises.push(
      prisma.trait
        .create({
          data: {
            description: trait.text,
            name: trait.name,
            is_template: true
          }
        })
        .catch((error: any) => {
          console.error(`Error creating trait ${trait.name}:`, error);
        })
    );
  }

  Promise.all(promises).finally(async () => {
    await prisma.$disconnect();
  });
}
