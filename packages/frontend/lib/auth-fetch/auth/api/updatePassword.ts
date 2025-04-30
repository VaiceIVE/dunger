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
