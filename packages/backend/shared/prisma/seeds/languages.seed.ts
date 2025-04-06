import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export async function SeedLanguages() {
    await prisma.language.upsert({
        where: { name: "Великаний" },
        update: {},
        create: { name: "Великаний" }
      });
      
      await prisma.language.upsert({
        where: { name: "Гномий" },
        update: {},
        create: { name: "Гномий" }
      });
      
      await prisma.language.upsert({
        where: { name: "Гоблинский" },
        update: {},
        create: { name: "Гоблинский" }
      });
      
      await prisma.language.upsert({
        where: { name: "Дварфский" },
        update: {},
        create: { name: "Дварфский" }
      });
      
      await prisma.language.upsert({
        where: { name: "Общий" },
        update: {},
        create: { name: "Общий" }
      });
      
      await prisma.language.upsert({
        where: { name: "Орочий" },
        update: {},
        create: { name: "Орочий" }
      });
      
      await prisma.language.upsert({
        where: { name: "Полуросликов" },
        update: {},
        create: { name: "Полуросликов" }
      });
      
      await prisma.language.upsert({
        where: { name: "Эльфийский" },
        update: {},
        create: { name: "Эльфийский" }
      });
      
      await prisma.language.upsert({
        where: { name: "Бездны" },
        update: {},
        create: { name: "Бездны" }
      });
      
      await prisma.language.upsert({
        where: { name: "Глубинная Речь" },
        update: {},
        create: { name: "Глубинная Речь" }
      });
      
      await prisma.language.upsert({
        where: { name: "Драконий" },
        update: {},
        create: { name: "Драконий" }
      });
      
      await prisma.language.upsert({
        where: { name: "Инфернальный" },
        update: {},
        create: { name: "Инфернальный" }
      });
      
      await prisma.language.upsert({
        where: { name: "Небесный" },
        update: {},
        create: { name: "Небесный" }
      });
      
      await prisma.language.upsert({
        where: { name: "Первичный" },
        update: {},
        create: { name: "Первичный" }
      });
      
      await prisma.language.upsert({
        where: { name: "Подземный" },
        update: {},
        create: { name: "Подземный" }
      });
      
      await prisma.language.upsert({
        where: { name: "Сильван" },
        update: {},
        create: { name: "Сильван" }
      });
}
SeedLanguages()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })