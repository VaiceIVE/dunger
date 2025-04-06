import { PrismaClient } from '@prisma/client'
import  * as actions_data from '../seed-data/actions_all_done.json'
const prisma = new PrismaClient()
export async function SeedActions() {

  for(const action_data of actions_data){
    await prisma.action.upsert({
      where: {
        description: action_data.text
      },
      update: {},
      create: {
        description: action_data.text,
        name: action_data.name
      }
    })
  }
  
}
SeedActions()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })