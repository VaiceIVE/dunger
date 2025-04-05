import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedAlignment() {
  await prisma.alignment.upsert({
      where: { id: 1 },
      update: {},
      create: {
          id: 1,
          name: "Законно-добрый"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 2 },
      update: {},
      create: {
        id: 2,  
        name: "Нейтрально-добрый"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 3 },
      update: {},
      create: {
        id: 3,  
        name: "Хаотично-добрый"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 4 },
      update: {},
      create: {
        id: 4,  
        name: "Законно-нейтральный"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 5 },
      update: {},
      create: {
        id: 5,  
        name: "Нейтральный"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 6 },
      update: {},
      create: {
        id: 6,  
        name: "Хаотично-нейтральный"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 7 },
      update: {},
      create: {
        id: 7,  
        name: "Законно-злой"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 8 },
      update: {},
      create: {
        id: 8,  
        name: "Нейтрально-злой"
      }
  }),
  await prisma.alignment.upsert({
      where: { id: 9 },
      update: {},
      create: {
        id: 9,  
        name: "Хаотично-злой"
      }
  })
}
SeedAlignment()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })