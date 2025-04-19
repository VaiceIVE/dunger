import { getAbilityModifier } from './getAbilityModifier';
import { getProficiencyBonusByCR } from './getProficiencyBonusByCR';

interface FormatModifierOptions {
  value: number | null | undefined;
  includeMastery?: boolean;
  mastery?: boolean;
  challengeRating?: number | string;
}

export const formatModifier = (options: FormatModifierOptions): string => {
  const { value, includeMastery = false, mastery = false, challengeRating } = options;

  if (value === null || value === undefined || value.toString() === '') {
    return '-';
  }

  const clampedValue = Math.min(30, Math.max(1, value));
  let mod = getAbilityModifier(clampedValue);

  if (includeMastery && mastery && challengeRating !== undefined) {
    mod += getProficiencyBonusByCR(challengeRating);
  }

  return `${mod >= 0 ? '+' : ''}${mod.toString()}`;
};
