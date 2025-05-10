import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();

export async function SeedActions() {
  const filePath = resolve(import.meta.dirname, '../data/actions.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const data: { name: string; text: string; attack: string }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  for (const action_data of data) {
    promises.push(
      await prisma.action
        .create({
          data: {
            description: action_data.text,
            name: action_data.name,
            attack: action_data.attack,
            is_template: true
          }
        })
        .catch(() => {})
    );
  }
  Promise.all(promises).then(() => {
    return 1;
  });
}
