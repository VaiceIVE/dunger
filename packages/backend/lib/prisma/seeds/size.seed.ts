import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedSizes() {
  const sizes = [
    { id: 'T', name: 'Крошечный' },
    { id: 'S', name: 'Маленький' },
    { id: 'M', name: 'Средний' },
    { id: 'L', name: 'Большой' },
    { id: 'H', name: 'Огромный' },
    { id: 'G', name: 'Громадный' }
  ];

  try {
    for (const size of sizes) {
      await prisma.size.upsert({
        where: { id: size.id },
        update: {},
        create: size
      });
    }
  } catch (error) {
    console.error('Error seeding sizes:', error);
  } finally {
    await prisma.$disconnect();
  }
}
