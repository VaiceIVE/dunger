import { AuthMethodReturn, AuthTokensResult } from './types';

export interface LoginInput {
  username: string;
  password: string;
}

/**
 * Функция для авторизации пользователя.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param input
 */
export async function login(apiUrl: string, input: LoginInput): Promise<AuthMethodReturn> {
  try {
    const response = await fetch(apiUrl + '/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: { 'Content-type': 'application/json' }
    });

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
