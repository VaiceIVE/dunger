import { AuthMethodReturn, AuthTokensResult } from './types';

/**
 * Функция для смены почты и получения новой пары токенов.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param oneTimeActionToken
 */
export async function updateEmail(apiUrl: string, oneTimeActionToken: string): Promise<AuthMethodReturn> {
  try {
    const response = await fetch(apiUrl + '/some-url', {
      body: JSON.stringify(oneTimeActionToken),
      headers: { 'Content-type': 'application/json' }
    });

    if (!response.ok)
      return {
        data: null,
        error: (await response.json()) as Error
      };

    const data = (await response.json()) as AuthTokensResult;

    return {
      data: data
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as Error
    };
  }
}
