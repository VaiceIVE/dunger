import { AuthMethodReturn, AuthTokensResult } from './types';

export interface RefreshTokenInput {
  refreshToken: string;
}

/**
 * Функция для обмена токенов.
 * Не выбрасывает исключения, возвращает ошибку в ответе
 * @param apiUrl
 * @param input
 */
export async function refreshToken(apiUrl: string, input: RefreshTokenInput): Promise<AuthMethodReturn> {
  try {
    const response = await fetch(apiUrl + '/auth/refresh', {
      method: 'POST',
      body: JSON.stringify(input),
      headers: { 'Content-Type': 'application/json' }
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
