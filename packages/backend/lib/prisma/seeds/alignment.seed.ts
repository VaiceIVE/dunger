import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SeedAlignment() {
  await prisma.alignment.upsert({
    where: { name: 'Законно-добрый' },
    update: {},
    create: {
      name: 'Законно-добрый'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Нейтрально-добрый' },
    update: {},
    create: {
      name: 'Нейтрально-добрый'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Хаотично-добрый' },
    update: {},
    create: {
      name: 'Хаотично-добрый'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Законно-нейтральный' },
    update: {},
    create: {
      name: 'Законно-нейтральный'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Нейтральный' },
    update: {},
    create: {
      name: 'Нейтральный'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Хаотично-нейтральный' },
    update: {},
    create: {
      name: 'Хаотично-нейтральный'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Законно-злой' },
    update: {},
    create: {
      name: 'Законно-злой'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Нейтрально-злой' },
    update: {},
    create: {
      name: 'Нейтрально-злой'
    }
  });

  await prisma.alignment.upsert({
    where: { name: 'Хаотично-злой' },
    update: {},
    create: {
      name: 'Хаотично-злой'
    }
  });
}

SeedAlignment()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
