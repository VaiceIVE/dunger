export const emailPattern = '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}';

/**
 * @param value email
 */
export function isValidEmail(value: string) {
  return new RegExp(emailPattern).test(value);
}
