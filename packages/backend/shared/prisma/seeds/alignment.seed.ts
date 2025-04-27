import { PrismaClient } from '@prisma/client'
import  * as creatures_data from '../seed-data/creatures_data.json'

const prisma = new PrismaClient()
export async function SeedAlignment() {

  let promises = []


  let alignments = Array.from(new Set(creatures_data.map(x=>x.alignment)));

  console.log(alignments)

  for (const alignment of alignments) {
    const normalizedName = alignment.trim().toLowerCase();
    
    promises.push(
      prisma.alignment.upsert({
        where: { name: normalizedName },
        update: {},
        create: {
          name: alignment 
        }
      }).catch(error => {
        // console.error(`Failed to upsert alignment "${alignment}":`, error);
      })
    );
  }
  Promise.all(promises).then(() => {return 1})

}
