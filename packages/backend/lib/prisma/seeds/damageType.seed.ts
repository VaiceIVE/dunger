import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedDamageType() {
  await prisma.damageType.upsert({
    where: { id: 'Acid' },
    update: {},
    create: {
      id: 'Acid',
      name: 'Кислотный'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Bludgeoning' },
    update: {},
    create: {
      id: 'Bludgeoning',
      name: 'Дробящий'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Cold' },
    update: {},
    create: {
      id: 'Cold',
      name: 'Холод'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Fire' },
    update: {},
    create: {
      id: 'Fire',
      name: 'Огонь'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Force' },
    update: {},
    create: {
      id: 'Force',
      name: 'Силовой'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Lightning' },
    update: {},
    create: {
      id: 'Lightning',
      name: 'Молния'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Necrotic' },
    update: {},
    create: {
      id: 'Necrotic',
      name: 'Некротический'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Piercing' },
    update: {},
    create: {
      id: 'Piercing',
      name: 'Колющий'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Poison' },
    update: {},
    create: {
      id: 'Poison',
      name: 'Яд'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Psychic' },
    update: {},
    create: {
      id: 'Psychic',
      name: 'Психический'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Radiant' },
    update: {},
    create: {
      id: 'Radiant',
      name: 'Излучение'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Slashing' },
    update: {},
    create: {
      id: 'Slashing',
      name: 'Рубящий'
    }
  });

  await prisma.damageType.upsert({
    where: { id: 'Thunder' },
    update: {},
    create: {
      id: 'Thunder',
      name: 'Звуковой'
    }
  });
}
SeedDamageType()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
