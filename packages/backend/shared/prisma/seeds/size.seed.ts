import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedSizes() {
let promises = []
promises.push(
    (async () => {
      try {
        await Promise.all([
          prisma.size.upsert({
            where: { id: "T" },
            update: {},
            create: { id: "T", name: "Крошечный" }
          }),
          prisma.size.upsert({
            where: { id: "S" },
            update: {},
            create: { id: "S", name: "Маленький" }
          }),
          prisma.size.upsert({
            where: { id: "M" },
            update: {},
            create: { id: "M", name: "Средний" }
          }),
          prisma.size.upsert({
            where: { id: "L" },
            update: {},
            create: { id: "L", name: "Большой" }
          }),
          prisma.size.upsert({
            where: { id: "H" },
            update: {},
            create: { id: "H", name: "Огромный" }
          }),
          prisma.size.upsert({
            where: { id: "G" },
            update: {},
            create: { id: "G", name: "Колоссальный" }
          })
        ]);
      } catch (error) {
        // console.error('Error in size upsert operations:', error);
      }
    })()
  );
  Promise.all(promises).then(() => {return 1})

}
