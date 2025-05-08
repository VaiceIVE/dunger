import { AuthMethodReturn, AuthTokensResult } from './types';

export interface UpdatePasswordInput {
  oldPassword: string;
  newPassword: string;
}

/**
 * Функция для смены пароля и получения новой пары токенов.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param input
 */
export async function updatePassword(apiUrl: string, input: UpdatePasswordInput): Promise<AuthMethodReturn> {
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
