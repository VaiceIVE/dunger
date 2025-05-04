import { AuthMethodReturn, AuthTokensResult } from './types';

export interface InitUserInput {
  email: string;
  username: string;
  password: string;
}

export interface InitUserData {
  authTokens: AuthTokensResult;
}

/**
 * Функция для регистрации нового пользователя.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param input
 */
export async function initUser(apiUrl: string, input: InitUserInput): Promise<AuthMethodReturn> {
  try {
    const response = await fetch(apiUrl + '/auth/signup', {
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
