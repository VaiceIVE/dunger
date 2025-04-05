import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedSources() {
  await prisma.source.upsert({
    where: {id: 1},
    update: {},
    create: {
        key: "DNG",
        title: "Dunger multiverse"
    }
  })
}
SeedSources()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })