import { PrismaClient } from '@prisma/client'
import  * as actions_data from '../seed-data/actions_all_done.json'
const prisma = new PrismaClient()
export async function SeedActions() {

  let promises = []

  for(const action_data of actions_data){
      promises.push(
        
            await prisma.action.create({
              data: {
                description: action_data.text,
                name: action_data.name,
                attack: action_data.attack,
                is_template: true
              }
            }).catch(() => {

            }))
  }
  Promise.all(promises).then(() => {return 1})
}
