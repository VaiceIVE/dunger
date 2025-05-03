import { Injectable, OnModuleInit } from '@nestjs/common';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { ConfigService } from '@nestjs/config';
import { AuthService } from 'src/auth/auth.service';
import { AppError } from 'src/common/errors';
import { HttpStatus } from '@dunger/common-enums';
import { AuthTokensResult } from 'src/auth/types';

@Injectable()
export class UserService implements OnModuleInit {
  public adminClient: KeycloakAdminClient;
  private readonly keycloakUrl: string;
  private readonly realm: string;
  private readonly adminClientId: string;
  private readonly adminClientSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    /**
     * Получение конфигурационных значений из окружения, используется clientId
     * администратора, для создания других юзеров
     */
    this.keycloakUrl = this.configService.get<string>('KEYCLOAK_URL');
    this.realm = this.configService.get<string>('KEYCLOAK_REALM');
    this.adminClientId = this.configService.get<string>(
      'KEYCLOAK_ADMIN_CLIENT_ID',
    );
    this.adminClientSecret = this.configService.get<string>(
      'KEYCLOAK_ADMIN_CLIENT_SECRET',
    );
  }

  /**
   * Инициализация admin клиента Keycloak при запуске модуля.
   */
  async onModuleInit() {
    this.adminClient = new KeycloakAdminClient({
      baseUrl: this.keycloakUrl,
      realmName: this.realm,
    });
    await this.authenticateAdmin();
  }

  /**
   * Аутентификация администратора для доступа к Keycloak Admin API.
   */
  private async authenticateAdmin() {
    try {
      await this.adminClient.auth({
        clientSecret: this.adminClientSecret,
        grantType: 'client_credentials',
        clientId: this.adminClientId,
      });
    } catch (error) {
      console.error('Admin auth failed:', error);
      throw error;
    }
  }

  /**
   * Обёртка для выполнения операций, требующих авторизации.
   * В случае ошибки авторизации пробует обновить токен и повторить запрос.
   */
  private async handleAuthError<T>(action: () => Promise<T>): Promise<T> {
    try {
      return await action();
    } catch (error) {
      if (error.response?.status === 401) {
        await this.refreshAdminToken();
        return await action();
      }
      throw error;
    }
  }

  /**
   * Обновление admin access токена.
   * При неудаче — повторная авторизация.
   */
  private async refreshAdminToken() {
    try {
      await this.adminClient.auth({
        grantType: 'refresh_token',
        refreshToken: this.adminClient.refreshToken,
        clientId: 'admin-cli',
      });
    } catch (error) {
      console.error('Failed to refresh admin token:', error);
      await this.authenticateAdmin();
    }
  }

  /**
   * Создание нового пользователя в Keycloak, с дальнейшей авторизацией,
   * возвращает пару токенов AuthTokensResult
   */
  async createUser(
    username: string,
    email: string,
    password: string,
  ): Promise<AuthTokensResult> {
    try {
      return await this.handleAuthError(async () => {
        await this.adminClient.users.create({
          username,
          email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false,
            },
          ],
        });

        // Возвращаем токены, выполнив логин
        return await this.authService.login(username, password);
      });
    } catch (error) {
      throw new AppError({
        errorText: `failed to create user`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        additionalInfo: `original error: ${error}`,
      });
    }
  }

  /**
   * Получение информации о пользователе по его ID из Keycloak.
   */
  async getUserById(userId: string) {
    try {
      return await this.handleAuthError(() =>
        this.adminClient.users.findOne({ id: userId }),
      );
    } catch (error) {
      throw new AppError({
        errorText: `failed to get user`,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        additionalInfo: `original error: ${error}`,
      });
    }
  }
}
