import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function SeedAlignment() {
  const alignments = [
    'Законно-добрый',
    'Нейтрально-добрый',
    'Хаотично-добрый',
    'Законно-нейтральный',
    'Нейтральный',
    'Хаотично-нейтральный',
    'Законно-злой',
    'Нейтрально-злой',
    'Хаотично-злой'
  ];

  for (const name of alignments) {
    await prisma.alignment.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }
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
