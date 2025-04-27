import { PrismaClient } from '@prisma/client'
import  * as traits_data from '../seed-data/traits_all_done.json'
const prisma = new PrismaClient()
export async function SeedTraits() {

  let promises = []

  
  for (const trait_data of traits_data) {
    promises.push(
      prisma.trait.create({
        data: {
          description: trait_data.text,
          name: trait_data.name,
          is_template: true
        }
      }).catch(error => {
        // console.error(`Error creating trait ${trait_data.name}:`, error);
      })
    );
  }
  

  Promise.all(promises).then(() => {return 1})

}
