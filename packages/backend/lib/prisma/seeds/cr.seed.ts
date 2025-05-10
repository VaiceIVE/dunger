import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedCR() {
  await prisma.challengeRating.upsert({
    where: { id: '0' },
    update: {},
    create: { id: '0' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '1/8' },
    update: {},
    create: { id: '1/8' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '1/4' },
    update: {},
    create: { id: '1/4' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '1/2' },
    update: {},
    create: { id: '1/2' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '1' },
    update: {},
    create: { id: '1' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '2' },
    update: {},
    create: { id: '2' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '3' },
    update: {},
    create: { id: '3' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '4' },
    update: {},
    create: { id: '4' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '5' },
    update: {},
    create: { id: '5' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '6' },
    update: {},
    create: { id: '6' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '7' },
    update: {},
    create: { id: '7' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '8' },
    update: {},
    create: { id: '8' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '9' },
    update: {},
    create: { id: '9' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '10' },
    update: {},
    create: { id: '10' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '11' },
    update: {},
    create: { id: '11' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '12' },
    update: {},
    create: { id: '12' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '13' },
    update: {},
    create: { id: '13' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '14' },
    update: {},
    create: { id: '14' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '15' },
    update: {},
    create: { id: '15' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '16' },
    update: {},
    create: { id: '16' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '17' },
    update: {},
    create: { id: '17' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '18' },
    update: {},
    create: { id: '18' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '19' },
    update: {},
    create: { id: '19' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '20' },
    update: {},
    create: { id: '20' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '21' },
    update: {},
    create: { id: '21' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '22' },
    update: {},
    create: { id: '22' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '23' },
    update: {},
    create: { id: '23' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '24' },
    update: {},
    create: { id: '24' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '25' },
    update: {},
    create: { id: '25' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '26' },
    update: {},
    create: { id: '26' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '27' },
    update: {},
    create: { id: '27' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '28' },
    update: {},
    create: { id: '28' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '29' },
    update: {},
    create: { id: '29' }
  });

  await prisma.challengeRating.upsert({
    where: { id: '30' },
    update: {},
    create: { id: '30' }
  });
}
