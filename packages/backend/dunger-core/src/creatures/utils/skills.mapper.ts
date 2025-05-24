import { Ability, SkillMetadata } from '@dunger/prisma';
import { ApiSkill, ApiSkills } from 'src/common/dto';

export type ApiSkillsByAbility = {
  [K in Lowercase<Exclude<Ability, 'CONSTITUTION'>>]: {
    [skill: string]: ApiSkill;
  };
};

/**
 * Преобразует массив скиллов в сгруппированный по способностям объект.
 * @param skills - сырые данные из creature_skills
 * @param metadata - данные из таблицы skill_metadata
 */
export function mapAbilitiesToApiSkills(
  skillMetadata: SkillMetadata[],
  skills?: {
    skill: string;
    value: number | null;
    mastery: boolean;
  }[],
): ApiSkills {
  const result: ApiSkillsByAbility = {
    strength: {},
    dexterity: {},
    intelligence: {},
    wisdom: {},
    charisma: {},
  };

  for (const meta of skillMetadata) {
    const abilityKey = meta.ability.toLowerCase() as keyof ApiSkillsByAbility;
    const skillKey = meta.skill.toLowerCase();

    const skillData = skills?.find((s) => s.skill === meta.skill);

    result[abilityKey][skillKey] = {
      name: meta.display_name,
      value: skillData?.value ?? null,
      mastery: skillData?.mastery ?? false,
    };
  }

  return result as unknown as ApiSkills;
}
