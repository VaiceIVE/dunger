import { DungerError, isDungerErrorBody } from '../../error';
import { InitUserInput, initUser } from '../api/initUser';
import { login } from '../api/login';
import { refreshToken, RefreshTokenInput } from '../api/refreshToken';
import { resetPassword } from '../api/resetPassword';
import { AuthMethodReturn } from '../api/types';
import { updateEmail } from '../api/updateEmail';
import { updatePassword } from '../api/updatePassword';
import { singleton } from './_internal/singleton';
import { Cache, CacheEntry } from './Cache';

export class AuthService {
  public readonly cache: Cache;
  private readonly apiUrl: string;

  constructor(cache: Cache, apiUrl: string) {
    this.cache = cache;
    this.apiUrl = apiUrl;
  }

  /**
   * Метод для получения НАЧАЛЬНОГО состояния аутентификации пользователя
   * Подробное описание определения начального состояния и дальнейшего обновления
   * можно найти в AuthProvider
   */
  public isAuthenticated() {
    const entry = this.cache.get('auth');
    return !!entry?.body.refreshToken && entry.body.refreshTokenExp * 1000 - 30000 > Date.now();
  }

  /**
   * Возвращает текущий токен / обновленный токен.
   * Выбрасывает ошибку если токена нет / не удалось обновить
   */
  public async getToken() {
    const entry = this.cache.get('auth');

    if (!entry) {
      throw new Error('AuthService: no token');
    }

    if (entry.exp * 1000 - 30000 > Date.now()) {
      return entry.body.accessToken;
    }

    if (entry.body.refreshTokenExp * 1000 - 30000 > Date.now()) {
      const newEntry = await this._refreshToken({
        refreshToken: entry.body.refreshToken
      });

      return newEntry.body.accessToken;
    }

    throw new Error('AuthService: refresh token is outdated');
  }

  public async login(email: string, password: string) {
    return this._runMethod(() => login(this.apiUrl, { email, password }));
  }

  public async initUser(input: InitUserInput) {
    return this._runMethod(() => initUser(this.apiUrl, input));
  }

  public async updateEmail(oneTimeActionToken: string) {
    return this._runMethod(async () => updateEmail(this.apiUrl, oneTimeActionToken));
  }

  public async updatePassword(oldPassword: string, newPassword: string) {
    return this._runMethod(async () => updatePassword(this.apiUrl, { oldPassword, newPassword }));
  }

  public async resetPassword(oneTimeActionToken: string, password: string) {
    return this._runMethod(async () => resetPassword(this.apiUrl, { oneTimeActionToken, password }));
  }

  // async добавлен на будущее, когда функция будет вызывать какое-либо api
  public async logout() {
    this.cache.remove('auth');
    return Promise.resolve();
  }

  private _runMethod = singleton(async (callback: () => Promise<AuthMethodReturn>): Promise<CacheEntry> => {
    const response = await callback();

    // Если ошибка формата Dunger (кастомный формат ошибки с бэкенда),
    // то она преобразуется в DungerError и выбрасывается
    // В противном случае выбрасывается в исходном виде
    if (response.error) {
      if (response.error instanceof Error) {
        const errorBody = response.error;
        if (isDungerErrorBody(errorBody)) {
          throw new DungerError(errorBody);
        }
      }

      throw response.error;
    }

    // Если не было ошибки, но при этом нет данных, то выбрасывается ошибка
    if (!response.data) {
      throw new Error('AuthService: no data given');
    }

    const entry: CacheEntry = {
      exp: Math.floor(Date.now() / 1000 + response.data.accessTokenExpiresIn),
      body: {
        accessToken: response.data.accessToken,
        refreshToken: response.data.refreshToken,
        refreshTokenExp: Math.floor(Date.now() / 1000 + response.data.refreshTokenExpiresIn)
      }
    };

    this.cache.set('auth', entry);
    return entry;
  });

  private _refreshToken(input: RefreshTokenInput) {
    return this._runMethod(() => refreshToken(this.apiUrl, input));
  }
}
