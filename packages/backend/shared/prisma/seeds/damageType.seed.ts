import { PrismaClient } from '@prisma/client'
import  * as creatures_data from '../seed-data/creatures_data.json'

const prisma = new PrismaClient()
export async function SeedDamageType() {
    let promises = []

    let allDamageTypes = new Set()
    let damageStrings = Array.from(new Set(creatures_data.map(x=>x.immune)));
    damageStrings = damageStrings.concat(Array.from(new Set(creatures_data.map(x=>x.resist))))
    damageStrings = damageStrings.concat(Array.from(new Set(creatures_data.map(x=>x.vulnerable))))
    for(let damageString of damageStrings){
      let localDamageList: string[] = []
      if(damageString){
        let parts = damageString.split('; ')
        console.log(parts)
        localDamageList = parts.length > 1 ? [parts[1]] : []
        localDamageList = localDamageList.concat(parts[0].split(','))
      }
      if(localDamageList.length > 0){
        for(const damageType of localDamageList){
          console.log(damageType)
          allDamageTypes.add(damageType.trim().toLowerCase())
        }
      }
    }

    for (const damageType of Array.from(allDamageTypes)) {
      if (damageType && typeof damageType === 'string') {
        promises.push(
          prisma.damageType.create({
            data: {
              name: damageType,
              id: damageType
            }
          }).catch(error => {
            // console.error(`Failed to create damage type "${damageType}":`, error);

          })
        );
      }
    }


    Promise.all(promises).then(() => {return 1})


    // await prisma.damageType.upsert({
    //     where: { id: "Acid" },
    //     update: {},
    //     create: {
    //       id: "Acid",
    //       name: "кислотный"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Bludgeoning" },
    //     update: {},
    //     create: {
    //       id: "Bludgeoning",
    //       name: "дробящий"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Cold" },
    //     update: {},
    //     create: {
    //       id: "Cold",
    //       name: "холод"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Fire" },
    //     update: {},
    //     create: {
    //       id: "Fire",
    //       name: "огонь"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Force" },
    //     update: {},
    //     create: {
    //       id: "Force",
    //       name: "силовой"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Lightning" },
    //     update: {},
    //     create: {
    //       id: "Lightning",
    //       name: "молния"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Necrotic" },
    //     update: {},
    //     create: {
    //       id: "Necrotic",
    //       name: "некротический"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Piercing" },
    //     update: {},
    //     create: {
    //       id: "Piercing",
    //       name: "колющий"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Poison" },
    //     update: {},
    //     create: {
    //       id: "Poison",
    //       name: "яд"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Psychic" },
    //     update: {},
    //     create: {
    //       id: "Psychic",
    //       name: "психический"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Radiant" },
    //     update: {},
    //     create: {
    //       id: "Radiant",
    //       name: "излучение"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Slashing" },
    //     update: {},
    //     create: {
    //       id: "Slashing",
    //       name: "рубящий"
    //     }
    //   });
      
    //   await prisma.damageType.upsert({
    //     where: { id: "Thunder" },
    //     update: {},
    //     create: {
    //       id: "Thunder",
    //       name: "звуковой"
    //     }
    //   });
}
