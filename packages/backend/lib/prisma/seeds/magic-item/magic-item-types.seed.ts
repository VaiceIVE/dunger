import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { Gender, PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedMagicItemTypes() {
  const filePath = resolve(import.meta.dirname, '../../data/magic-items.json');

  try {
    const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
    const { typesList } = JSON.parse(defaultValuesFile) as {
      typesList: Record<
        string,
        {
          text: {
            en: { title: string };
            ru: { title: string; gender: Gender };
          };
        }
      >;
    };

    await Promise.all(
      Object.values(typesList).map((type) =>
        prisma.magicItemType.upsert({
          where: { id: type.text.en.title },
          update: {},
          create: {
            id: type.text.en.title,
            name: type.text.ru.title,
            gender: type.text.ru.gender
          }
        })
      )
    );
  } finally {
    await prisma.$disconnect();
  }
}
