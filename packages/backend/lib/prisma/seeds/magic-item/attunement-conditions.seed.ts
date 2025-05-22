import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

import { extractAttunementConditions } from '../../utils/extractAttunementConditions.ts';

const prisma = new PrismaClient();

type MagicItem = {
  ru: { attunement?: string };
};

type MagicItemsFile = {
  itemsList: MagicItem[];
};

export async function SeedAttunementConditions() {
  const filePath = resolve(import.meta.dirname, '../../data/magic-items.json');

  try {
    const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
    const { itemsList } = JSON.parse(defaultValuesFile) as MagicItemsFile;

    const attunementSet = new Set<string>();

    for (const item of itemsList) {
      const extracted = extractAttunementConditions(item.ru.attunement);

      for (const entry of extracted) {
        attunementSet.add(entry);
      }
    }

    for (const name of attunementSet) {
      await prisma.attunementCondition.upsert({
        where: { name },
        update: {},
        create: { name }
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
