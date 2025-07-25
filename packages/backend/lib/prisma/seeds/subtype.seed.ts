import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedTypes() {
  const promises = [];
  const types = [
    'аберрация',
    'зверь',
    'небожитель',
    'конструкт',
    'дракон',
    'элементаль',
    'фея',
    'исчадие',
    'великан',
    'гуманоид',
    'монстр',
    'растение',
    'нежить',
    'слизь',
    'стая крошечных зверей',
    'демон',
    'рой крошечных зверей'
  ];

  for (const type of types) {
    promises.push(
      prisma.type
        .create({
          data: {
            name: type
          }
        })
        .catch(() => {
          // console.error(`Error creating type ${type}:`, error);
        })
    );
  }
  Promise.all(promises).finally(async () => {
    await prisma.$disconnect();
  });
}
