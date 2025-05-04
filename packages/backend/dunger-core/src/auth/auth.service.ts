import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { AuthTokensResult } from './types';
import { AppError } from 'src/common/errors';

@Injectable()
export class AuthService {
  private readonly keycloakUrl: string;
  private readonly realm: string;
  private readonly clientId: string;
  private readonly clientSecret: string;

  constructor(private readonly configService: ConfigService) {
    /**
     * Получение конфигурационных значений из окружения, используется clientId
     * не администратора, так как тогда JWT payload не будет содержать данных
     * о пользователе.
     *
     * Подробнее в JwtStrategy
     */
    this.keycloakUrl = this.configService.get<string>('KEYCLOAK_URL');
    this.realm = this.configService.get<string>('KEYCLOAK_REALM');
    this.clientId = this.configService.get<string>('KEYCLOAK_CLIENT_ID');
    this.clientSecret = this.configService.get<string>(
      'KEYCLOAK_CLIENT_SECRET',
    );
  }

  /**
   * Приватный метод для получения токенов AuthTokensResult от Keycloak
   */
  private async getTokens(params: URLSearchParams): Promise<AuthTokensResult> {
    try {
      const { data } = await axios.post(
        `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`,
        params,
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );

      return {
        accessToken: data.access_token,
        accessTokenExpiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        refreshTokenExpiresIn: data.refresh_expires_in,
      };
    } catch (error) {
      throw new AppError({
        errorText: `failed to generate tokens`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        additionalInfo: `original error: ${error}`,
      });
    }
  }

  /**
   * Метод для авторизации пользователя с использованием логина и пароля
   */
  async login(username: string, password: string): Promise<AuthTokensResult> {
    const params = new URLSearchParams({
      grant_type: 'password',
      client_id: this.clientId,
      username,
      password,
      client_secret: this.clientSecret,
    });

    return this.getTokens(params);
  }

  /**
   * Метод для обновления токенов с использованием refresh_token
   */
  async regenerateTokens(refreshToken: string): Promise<AuthTokensResult> {
    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: this.clientId,
      refresh_token: refreshToken,
      client_secret: this.clientSecret,
    });

    return this.getTokens(params);
  }
}
