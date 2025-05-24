import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

type RarityItem = {
  coast: string; // TODO: поправить опечатку в данных
  text: {
    en: { title: string };
    ru: {
      title: string;
      he: string;
      she?: string;
      it: string;
      order: number;
    };
  };
};

type RarityFile = {
  rarityList: Record<string, RarityItem>;
};

export async function SeedRarities() {
  const filePath = resolve(import.meta.dirname, '../../data/magic-items.json');

  try {
    const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
    const { rarityList } = JSON.parse(defaultValuesFile) as RarityFile;

    await Promise.all(
      Object.values(rarityList).map((rarity) =>
        prisma.magicItemRarity.upsert({
          where: { id: rarity.text.en.title },
          update: {},
          create: {
            id: rarity.text.en.title,
            cost: rarity.coast,
            name: rarity.text.ru.title,
            name_he: rarity.text.ru.he,
            name_she: rarity.text.ru.she ?? rarity.text.ru.title,
            name_it: rarity.text.ru.it,
            order: rarity.text.ru.order
          }
        })
      )
    );
  } finally {
    await prisma.$disconnect();
  }
}
