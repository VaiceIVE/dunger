import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedSkills() {
  try {
    await prisma.skillMetadata.createMany({
      data: [
        { skill: 'ATHLETICS', display_name: 'Атлетика', ability: 'STRENGTH' },
        { skill: 'ACROBATICS', display_name: 'Акробатика', ability: 'DEXTERITY' },
        { skill: 'SLEIGHT_OF_HAND', display_name: 'Ловкость рук', ability: 'DEXTERITY' },
        { skill: 'STEALTH', display_name: 'Скрытность', ability: 'DEXTERITY' },
        { skill: 'ARCANA', display_name: 'Магия', ability: 'INTELLIGENCE' },
        { skill: 'HISTORY', display_name: 'История', ability: 'INTELLIGENCE' },
        { skill: 'INVESTIGATION', display_name: 'Расследование', ability: 'INTELLIGENCE' },
        { skill: 'NATURE', display_name: 'Природа', ability: 'INTELLIGENCE' },
        { skill: 'RELIGION', display_name: 'Религия', ability: 'INTELLIGENCE' },
        { skill: 'ANIMAL_HANDLING', display_name: 'Обращение с животными', ability: 'WISDOM' },
        { skill: 'INSIGHT', display_name: 'Проницательность', ability: 'WISDOM' },
        { skill: 'MEDICINE', display_name: 'Медицина', ability: 'WISDOM' },
        { skill: 'PERCEPTION', display_name: 'Восприятие', ability: 'WISDOM' },
        { skill: 'SURVIVAL', display_name: 'Выживание', ability: 'WISDOM' },
        { skill: 'DECEPTION', display_name: 'Обман', ability: 'CHARISMA' },
        { skill: 'INTIMIDATION', display_name: 'Запугивание', ability: 'CHARISMA' },
        { skill: 'PERFORMANCE', display_name: 'Выступление', ability: 'CHARISMA' },
        { skill: 'PERSUASION', display_name: 'Убеждение', ability: 'CHARISMA' }
      ]
    });
  } finally {
    await prisma.$disconnect();
  }
}
