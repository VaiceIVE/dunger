import { AuthMethodReturn, AuthTokensResult } from './types';

/**
 * Функция для смены почты и получения новой пары токенов.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param oneTimeActionToken
 */
export async function updateEmail(apiUrl: string, oneTimeActionToken: string): Promise<AuthMethodReturn> {
  try {
    return {
      data: null
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as Error
    };
  }
}
