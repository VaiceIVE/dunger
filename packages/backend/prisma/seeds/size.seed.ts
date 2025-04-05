import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedSizes() {
  await prisma.size.upsert({
      where: { key: "T" },
      update: {},
      create: {
          key: "T",
          name: "Крошечный"
      }
  }),
  await prisma.size.upsert({
      where: { key: "S" },
      update: {},
      create: {
          key: "S",
          name: "Маленький"
      }
  }),
  await prisma.size.upsert({
      where: { key: "M" },
      update: {},
      create: {
          key: "M",
          name: "Средний"
      }
  }),
  await prisma.size.upsert({
      where: { key: "L" },
      update: {},
      create: {
          key: "L",
          name: "Большой"
      }
  }),
  await prisma.size.upsert({
      where: { key: "H" },
      update: {},
      create: {
          key: "H",
          name: "Огромный"
      }
  }),
  await prisma.size.upsert({
      where: { key: "G" },
      update: {},
      create: {
          key: "G",
          name: "Громадный"
      }
  })
    
}
SeedSizes()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })