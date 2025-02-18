export function nullifyEmpty<V>(value: V) {
  if (value === '') return null;
  return value;
}
