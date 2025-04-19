export const updateNestedField = <T extends object>(obj: T, path: string, value: unknown): T => {
  const keys = path.split('.');
  const lastKey = keys.length ? keys.pop() : keys;

  const newObj = { ...obj };

  let curr = newObj;
  for (const key of keys) {
    curr[key as keyof T] = { ...curr[key as keyof T] };
    curr = curr[key as keyof T] as T;
  }

  if (lastKey) (curr[lastKey as keyof T] as T) = value as T;

  return newObj;
};
