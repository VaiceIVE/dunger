import { createContext } from 'react';
import { InitUserInput } from '../api/initUser';

export interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
}

export interface IAuthContext extends AuthState {
  /**
   * Авторизует пользователя, получает пару токенов.
   * При возникновении ошибки выбрасывает исключение с ошибкой DungerError | Error
   */
  login: (email: string, password: string) => Promise<void>;
  /**
   * Создает аккаунт пользователя, получает пару токенов.
   * При возникновении ошибки выбрасывает исключение с ошибкой DungerError | Error
   */
  initUser: (input: InitUserInput) => Promise<void>;
  /**
   * Обновляет почту пользователя, получает новую пару токенов.
   * При возникновении ошибки выбрасывает исключение с ошибкой DungerError | Error
   */
  updateEmail: (oneTimeActionToken: string) => Promise<void>;
  /**
   * Обновляет пароль пользователя, получает новую пару токенов.
   * При возникновении ошибки выбрасывает исключение с ошибкой DungerError | Error
   */
  updatePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  /**
   * Обновляет пароль пользователя, получает новую пару токенов.
   * При возникновении ошибки выбрасывает исключение с ошибкой DungerError | Error
   */
  resetPassword: (oneTimeActionToken: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string>;
}

export const AuthContext = createContext<IAuthContext | null>(null);
