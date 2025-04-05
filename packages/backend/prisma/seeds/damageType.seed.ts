import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedDamageType() {
    await prisma.damageType.upsert({
        where: { key: "Acid" },
        update: {},
        create: {
          key: "Acid",
          name: "Кислотный"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Bludgeoning" },
        update: {},
        create: {
          key: "Bludgeoning",
          name: "Дробящий"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Cold" },
        update: {},
        create: {
          key: "Cold",
          name: "Холод"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Fire" },
        update: {},
        create: {
          key: "Fire",
          name: "Огонь"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Force" },
        update: {},
        create: {
          key: "Force",
          name: "Силовой"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Lightning" },
        update: {},
        create: {
          key: "Lightning",
          name: "Молния"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Necrotic" },
        update: {},
        create: {
          key: "Necrotic",
          name: "Некротический"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Piercing" },
        update: {},
        create: {
          key: "Piercing",
          name: "Колющий"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Poison" },
        update: {},
        create: {
          key: "Poison",
          name: "Яд"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Psychic" },
        update: {},
        create: {
          key: "Psychic",
          name: "Психический"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Radiant" },
        update: {},
        create: {
          key: "Radiant",
          name: "Излучение"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Slashing" },
        update: {},
        create: {
          key: "Slashing",
          name: "Рубящий"
        }
      });
      
      await prisma.damageType.upsert({
        where: { key: "Thunder" },
        update: {},
        create: {
          key: "Thunder",
          name: "Звуковой"
        }
      });
}
SeedDamageType()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })