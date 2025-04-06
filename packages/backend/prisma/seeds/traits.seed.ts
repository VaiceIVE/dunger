import { PrismaClient } from '@prisma/client'
import  * as traits_data from '../seed-data/traits_all_done.json'
const prisma = new PrismaClient()
export async function SeedTraits() {

  for(const trait_data of traits_data){
    await prisma.trait.upsert({
      where: {
        description: trait_data.text
      },
      update: {},
      create: {
        description: trait_data.text,
        name: trait_data.name
      }
    })
  }
  
}
SeedTraits()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })