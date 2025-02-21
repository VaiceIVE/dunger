export const urlPattern =
  '^(((https?:\\/\\/)?(([0-9a-z_\\-]+\\.))+([a-z]{2,})(:[0-9]{1,5})?(\\/[~0-9a-zA-Z\\.\\/_\\-]*)?(\\?[0-9a-zA-Z&=]*)?)?)$';

/**
 * @param value url в формате http(s)?://some_url или some_url
 */
export function isValidURL(value: string) {
  return new RegExp(urlPattern).test(value);
}
