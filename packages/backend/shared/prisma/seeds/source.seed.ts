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
