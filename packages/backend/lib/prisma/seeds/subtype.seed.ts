import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedTypes() {
  await prisma.type.upsert({
    where: { id: 1 },
    update: {},
    create: {
      name: 'Аберрация'
    }
  });

  await prisma.type.upsert({
    where: { id: 2 },
    update: {},
    create: {
      name: 'Зверь'
    }
  });

  await prisma.type.upsert({
    where: { id: 3 },
    update: {},
    create: {
      name: 'Небожитель'
    }
  });

  await prisma.type.upsert({
    where: { id: 4 },
    update: {},
    create: {
      name: 'Конструкт'
    }
  });

  await prisma.type.upsert({
    where: { id: 5 },
    update: {},
    create: {
      name: 'Дракон'
    }
  });

  await prisma.type.upsert({
    where: { id: 6 },
    update: {},
    create: {
      name: 'Элементаль'
    }
  });

  await prisma.type.upsert({
    where: { id: 7 },
    update: {},
    create: {
      name: 'Фея'
    }
  });

  await prisma.type.upsert({
    where: { id: 8 },
    update: {},
    create: {
      name: 'Исчадие'
    }
  });

  await prisma.type.upsert({
    where: { id: 9 },
    update: {},
    create: {
      name: 'Великан'
    }
  });

  await prisma.type.upsert({
    where: { id: 10 },
    update: {},
    create: {
      name: 'Гуманоид'
    }
  });

  await prisma.type.upsert({
    where: { id: 11 },
    update: {},
    create: {
      name: 'Монстр'
    }
  });

  await prisma.type.upsert({
    where: { id: 12 },
    update: {},
    create: {
      name: 'Растение'
    }
  });

  await prisma.type.upsert({
    where: { id: 13 },
    update: {},
    create: {
      name: 'Нежить'
    }
  });

  await prisma.type.upsert({
    where: { id: 14 },
    update: {},
    create: {
      name: 'Слизь'
    }
  });

  await prisma.type.upsert({
    where: { id: 15 },
    update: {},
    create: {
      name: 'Стая крошечных зверей'
    }
  });
}
SeedTypes()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
