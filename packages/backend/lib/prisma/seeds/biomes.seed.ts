import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export async function SeedBiomes() {
  await prisma.biome.upsert({
    where: { key: 'PTU' },
    update: {},
    create: {
      key: 'PTU',
      title: 'Полярная тундра'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'COS' },
    update: {},
    create: {
      key: 'COS',
      title: 'Побережье'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'UND' },
    update: {},
    create: {
      key: 'UND',
      title: 'Под водой'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'PLM' },
    update: {},
    create: {
      key: 'PLM',
      title: 'Равнина/Луг'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'UDG' },
    update: {},
    create: {
      key: 'UDG',
      title: 'Подземье'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'CIT' },
    update: {},
    create: {
      key: 'CIT',
      title: 'Город'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'VIL' },
    update: {},
    create: {
      key: 'VIL',
      title: 'Деревня'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'RUI' },
    update: {},
    create: {
      key: 'RUI',
      title: 'Руины'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'DUN' },
    update: {},
    create: {
      key: 'DUN',
      title: 'Подземелья'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'HIL' },
    update: {},
    create: {
      key: 'HIL',
      title: 'Холмы'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'MOU' },
    update: {},
    create: {
      key: 'MOU',
      title: 'Горы'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'SWA' },
    update: {},
    create: {
      key: 'SWA',
      title: 'Болото'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'DES' },
    update: {},
    create: {
      key: 'DES',
      title: 'Пустыня'
    }
  });

  await prisma.biome.upsert({
    where: { key: 'TRO' },
    update: {},
    create: {
      key: 'TRO',
      title: 'Тропики'
    }
  });
}
SeedBiomes()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
