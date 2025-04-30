import { AuthMethodReturn, AuthTokensResult } from './types';

export interface LoginInput {
  email: string;
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
