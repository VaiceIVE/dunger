import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedSizes() {
  await prisma.size.upsert({
    where: { id: 'T' },
    update: {},
    create: {
      id: 'T',
      name: 'Крошечный'
    }
  });

  await prisma.size.upsert({
    where: { id: 'S' },
    update: {},
    create: {
      id: 'S',
      name: 'Маленький'
    }
  });

  await prisma.size.upsert({
    where: { id: 'M' },
    update: {},
    create: {
      id: 'M',
      name: 'Средний'
    }
  });

  await prisma.size.upsert({
    where: { id: 'L' },
    update: {},
    create: {
      id: 'L',
      name: 'Большой'
    }
  });

  await prisma.size.upsert({
    where: { id: 'H' },
    update: {},
    create: {
      id: 'H',
      name: 'Огромный'
    }
  });

  await prisma.size.upsert({
    where: { id: 'G' },
    update: {},
    create: {
      id: 'G',
      name: 'Громадный'
    }
  });
}
SeedSizes()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
