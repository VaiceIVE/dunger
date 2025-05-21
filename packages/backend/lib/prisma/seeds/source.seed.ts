import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedSources() {
  await prisma.source.upsert({
    where: { id: 1 },
    update: {},
    create: {
      short_name: 'DUNGER',
      name: 'Мультивселенная Данжера'
    }
  });

  await prisma.source.upsert({
    where: { id: 2 },
    update: {},
    create: {
      short_name: 'MM',
      name: 'Бестиарий'
    }
  });

  await prisma.source.upsert({
    where: { id: 3 },
    update: {},
    create: {
      short_name: 'VGM',
      name: 'Справочник Воло по монстрам'
    }
  });

  await prisma.source.upsert({
    where: { id: 4 },
    update: {},
    create: {
      short_name: 'XGE',
      name: 'Руководство Занатара обо всем'
    }
  });

  await prisma.source.upsert({
    where: { id: 5 },
    update: {},
    create: {
      short_name: 'MTF',
      name: 'Том Морденкайнена о врагах'
    }
  });

  await prisma.source.upsert({
    where: { id: 6 },
    update: {},
    create: {
      short_name: 'DMG',
      name: 'Книга мастера'
    }
  });

  await prisma.source.upsert({
    where: { id: 7 },
    update: {},
    create: {
      short_name: 'TOA',
      name: 'Гробница Аннигиляции'
    }
  });
}
