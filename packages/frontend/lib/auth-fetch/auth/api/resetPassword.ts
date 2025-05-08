import { AuthMethodReturn, AuthTokensResult } from './types';

export interface ResetPasswordInput {
  oneTimeActionToken: string;
  password: string;
}

/**
 * Функция для восстановления пароля и получения новой пары токенов.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param input
 */
export async function resetPassword(apiUrl: string, input: ResetPasswordInput): Promise<AuthMethodReturn> {
  try {
    const response = await fetch(apiUrl + '/some-url', {
      body: JSON.stringify(input),
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
