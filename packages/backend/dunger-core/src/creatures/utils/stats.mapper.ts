import { ApiStats } from 'src/common/dto';

interface RawAbilityEntry {
  id: string;
  ability: string;
  value: number;
  mastery: boolean;
  creature_stats_id: string;
}

const defaultStats: ApiStats = {
  strength: { mastery: false, value: 8 },
  dexterity: { mastery: false, value: 8 },
  constitution: { mastery: false, value: 8 },
  intelligence: { mastery: false, value: 8 },
  wisdom: { mastery: false, value: 8 },
  charisma: { mastery: false, value: 8 },
};

export function mapAbilitiesToApiStats(
  abilities?: RawAbilityEntry[] | null,
): ApiStats {
  if (!abilities || !Array.isArray(abilities)) {
    return { ...defaultStats };
  }

  return abilities.reduce(
    (acc, entry) => {
      const key = entry.ability.toLowerCase() as keyof ApiStats;
      if (acc[key]) {
        acc[key] = {
          value: entry.value,
          mastery: entry.mastery,
        };
      }
      return acc;
    },
    { ...defaultStats },
  );
}
