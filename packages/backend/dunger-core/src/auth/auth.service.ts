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
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          const status = error.response.status;
          const kcError = error.response.data?.error;
          const kcDescription = error.response.data?.error_description;

          if (kcError === 'invalid_grant') {
            throw new AppError({
              errorText: 'wrong email or password',
              statusCode: HttpStatus.FORBIDDEN,
            });
          }

          throw new AppError({
            errorText: `Keycloak responded with status ${status}`,
            statusCode: status,
            additionalInfo: `error: ${kcError}, description: ${kcDescription}`,
          });
        } else if (error.request) {
          throw new AppError({
            errorText: 'No response from Keycloak',
            statusCode: HttpStatus.GATEWAY_TIMEOUT,
            additionalInfo:
              'Request was made but no response received from Keycloak',
          });
        } else {
          throw new AppError({
            errorText: 'Failed to make request to Keycloak',
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            additionalInfo: error.message,
          });
        }
      }

      throw new AppError({
        errorText: 'Unexpected error while retrieving tokens',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        additionalInfo: error?.message || String(error),
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
