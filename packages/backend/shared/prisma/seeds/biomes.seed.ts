import { PrismaClient } from '@prisma/client'
import  * as biomes from '../seed-data/biomes.json'


const prisma = new PrismaClient()
export async function SeedBiomes() {
  let promises = []

  for (const biome of biomes) {
    const normalizedKey = biome.text.key.trim().toLowerCase();
    
    promises.push(
      prisma.biome.upsert({
        where: { key: normalizedKey },
        update: {},
        create: {
          key: biome.text.key,
          title: biome.text.title
        }
      }).catch(error => {
        // console.error(`Failed to upsert biome "${biome.text.key}":`, error);
      })
    );
  }

  Promise.all(promises).then(() => {return 1})

}
