import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { PrismaClient } from '@dunger/prisma';

const prisma = new PrismaClient();
export async function SeedDamageType() {
  const filePath = resolve(import.meta.dirname, '../data/creatures_data.json');
  const defaultValuesFile = await readFile(filePath, { encoding: 'utf-8' });
  const creatures: {
    immune: string;
    resist: string;
    vulnerable: string;
  }[] = JSON.parse(defaultValuesFile);

  const promises = [];

  const allDamageTypes = new Set();
  const damageStrings = Array.from(
    new Set(creatures.flatMap(({ immune, resist, vulnerable }) => [immune, resist, vulnerable]))
  );

  for (const damageString of damageStrings) {
    let localDamageList: string[] = [];
    if (damageString) {
      const parts = damageString.split('; ');
      console.log(parts);
      localDamageList = parts.length > 1 ? [parts[1]] : [];
      localDamageList = localDamageList.concat(parts[0].split(','));
    }
    if (localDamageList.length > 0) {
      for (const damageType of localDamageList) {
        console.log(damageType);
        allDamageTypes.add(damageType.trim().toLowerCase());
      }
    }
  }

  for (const damageType of Array.from(allDamageTypes)) {
    if (damageType && typeof damageType === 'string') {
      promises.push(
        prisma.damageType
          .create({
            data: {
              name: damageType,
              id: damageType
            }
          })
          .catch(() => {
            // console.error(`Failed to create damage type "${damageType}":`, error);
          })
      );
    }
  }

  Promise.all(promises).then(() => {
    return 1;
  });
}
