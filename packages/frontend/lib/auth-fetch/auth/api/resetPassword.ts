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
    const response = await fetch(apiUrl + '/auth/login', {
      body: JSON.stringify(input),
      headers: { 'Content-type': 'application/json' }
    });

    return {
      response
    };
  } catch (error: unknown) {
    return {
      data: null,
      error: error as Error
    };
  }
}
