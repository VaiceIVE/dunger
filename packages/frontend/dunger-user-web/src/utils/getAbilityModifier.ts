/**
 * Вычисляет модификатор от значения характеристики.
 * Используется для определения бонусов/штрафов по Силе, Ловкости и т.п. в D&D 5e.
 *
 * @param score - Значение характеристики (обычно от 1 до 30).
 * @returns Числовой модификатор (например, 10 → 0, 18 → +4, 7 → -2).
 */
export function getAbilityModifier(score?: number): number {
  if (!score) return 0;

  return Math.floor((score - 10) / 2);
}
