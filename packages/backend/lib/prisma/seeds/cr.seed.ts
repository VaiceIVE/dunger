import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedCR() {
  try {
    await prisma.challengeRatingMetadata.createMany({
      data: [
        { cr: 'CR_0', display: '0', numeric: 0, xp_reward: 10 },
        { cr: 'CR_1_8', display: '1/8', numeric: 0.125, xp_reward: 25 },
        { cr: 'CR_1_4', display: '1/4', numeric: 0.25, xp_reward: 50 },
        { cr: 'CR_1_2', display: '1/2', numeric: 0.5, xp_reward: 100 },
        { cr: 'CR_1', display: '1', numeric: 1, xp_reward: 200 },
        { cr: 'CR_2', display: '2', numeric: 2, xp_reward: 450 },
        { cr: 'CR_3', display: '3', numeric: 3, xp_reward: 700 },
        { cr: 'CR_4', display: '4', numeric: 4, xp_reward: 1100 },
        { cr: 'CR_5', display: '5', numeric: 5, xp_reward: 1800 },
        { cr: 'CR_6', display: '6', numeric: 6, xp_reward: 2300 },
        { cr: 'CR_7', display: '7', numeric: 7, xp_reward: 2900 },
        { cr: 'CR_8', display: '8', numeric: 8, xp_reward: 3900 },
        { cr: 'CR_9', display: '9', numeric: 9, xp_reward: 5000 },
        { cr: 'CR_10', display: '10', numeric: 10, xp_reward: 5900 },
        { cr: 'CR_11', display: '11', numeric: 11, xp_reward: 7200 },
        { cr: 'CR_12', display: '12', numeric: 12, xp_reward: 8400 },
        { cr: 'CR_13', display: '13', numeric: 13, xp_reward: 10000 },
        { cr: 'CR_14', display: '14', numeric: 14, xp_reward: 11500 },
        { cr: 'CR_15', display: '15', numeric: 15, xp_reward: 13000 },
        { cr: 'CR_16', display: '16', numeric: 16, xp_reward: 15000 },
        { cr: 'CR_17', display: '17', numeric: 17, xp_reward: 18000 },
        { cr: 'CR_18', display: '18', numeric: 18, xp_reward: 20000 },
        { cr: 'CR_19', display: '19', numeric: 19, xp_reward: 22000 },
        { cr: 'CR_20', display: '20', numeric: 20, xp_reward: 25000 },
        { cr: 'CR_21', display: '21', numeric: 21, xp_reward: 33000 },
        { cr: 'CR_22', display: '22', numeric: 22, xp_reward: 41000 },
        { cr: 'CR_23', display: '23', numeric: 23, xp_reward: 50000 },
        { cr: 'CR_24', display: '24', numeric: 24, xp_reward: 62000 },
        { cr: 'CR_25', display: '25', numeric: 25, xp_reward: 75000 },
        { cr: 'CR_26', display: '26', numeric: 26, xp_reward: 90000 },
        { cr: 'CR_27', display: '27', numeric: 27, xp_reward: 105000 },
        { cr: 'CR_28', display: '28', numeric: 28, xp_reward: 120000 },
        { cr: 'CR_29', display: '29', numeric: 29, xp_reward: 135000 },
        { cr: 'CR_30', display: '30', numeric: 30, xp_reward: 155000 }
      ]
    });
  } finally {
    await prisma.$disconnect();
  }
}
