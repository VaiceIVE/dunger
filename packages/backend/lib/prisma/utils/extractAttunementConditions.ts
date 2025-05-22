export function extractAttunementConditions(input?: string): string[] {
  if (!input) return [];

  const match = input.match(/\(требуется настройка(?:\s+)?(.*?)\)/i);
  if (!match || !match[1]) return [];

  return match[1]
    .split(',')
    .map((s) => s.trim())
    .filter((s) => s.length > 0);
}
