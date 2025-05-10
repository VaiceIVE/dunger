import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedSources() {
  await prisma.source.upsert({
    where: { id: 1 },
    update: {},
    create: {
      shortName: 'DUNGER',
      name: 'Мультивселенная Данжера'
    }
  });

  await prisma.source.upsert({
    where: { id: 2 },
    update: {},
    create: {
      shortName: 'MM',
      name: 'Бестиарий'
    }
  });

  await prisma.source.upsert({
    where: { id: 3 },
    update: {},
    create: {
      shortName: 'VGM',
      name: 'Справочник Воло по монстрам'
    }
  });

  await prisma.source.upsert({
    where: { id: 4 },
    update: {},
    create: {
      shortName: 'XGE',
      name: 'Руководство Занатара обо всем'
    }
  });

  await prisma.source.upsert({
    where: { id: 5 },
    update: {},
    create: {
      shortName: 'MTF',
      name: 'Том Морденкайнена о врагах'
    }
  });
}
