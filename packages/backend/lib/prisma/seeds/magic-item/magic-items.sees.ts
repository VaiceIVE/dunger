import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

import { extractAttunementConditions } from '../../utils/extractAttunementConditions.ts';

const prisma = new PrismaClient();

// Типизация данных из JSON
type MagicItem = {
  en: { type: string; rarity: string; source: string };
  ru: { name: string; text: string; attunement?: string };
};

type MagicItemsFile = {
  itemsList: MagicItem[];
};

export async function SeedMagicItems() {
  const filePath = resolve(import.meta.dirname, '../../data/magic-items.json');

  try {
    const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
    const { itemsList } = JSON.parse(defaultValuesFile) as MagicItemsFile;

    const sources = await prisma.source.findMany();
    const sourceMap = new Map(sources.map((source) => [source.short_name, source.id]));

    for (const item of itemsList) {
      const sourceId = sourceMap.get(item.en.source);

      if (!sourceId) {
        continue;
      }

      const attunementNames = extractAttunementConditions(item.ru.attunement);
      const attunementConditions = await prisma.attunementCondition.findMany({
        where: { name: { in: attunementNames } }
      });

      const createdItem = await prisma.magicItem.create({
        data: {
          name: item.ru.name,
          description: item.ru.text,
          type_relation: { connect: { id: item.en.type } },
          rarity_relation: { connect: { id: item.en.rarity } },
          source_relation: { connect: { id: sourceId } }
        }
      });

      await prisma.magicItemAttunement.createMany({
        data: attunementConditions.map((cond) => ({
          magicItemId: createdItem.id,
          attunementId: cond.id
        }))
      });
    }
  } finally {
    await prisma.$disconnect();
  }
}
