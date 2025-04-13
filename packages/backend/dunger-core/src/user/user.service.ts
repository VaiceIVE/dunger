import { Injectable, OnModuleInit } from '@nestjs/common';
import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService implements OnModuleInit {
  public adminClient: KeycloakAdminClient;

  constructor(
    private readonly configService: ConfigService
  ) {}

  async onModuleInit() {
    this.adminClient = new KeycloakAdminClient({
      baseUrl: this.configService.get('KEYCLOAK_URL'), 
      realmName: this.configService.get('KEYCLOAK_REALM'),
    });
    await this.authenticateAdmin();
  }

  private async authenticateAdmin() {
    try {
      await this.adminClient.auth({
        clientSecret: this.configService.get('KEYCLOAK_CLIENT_SECRET'),
        grantType: 'client_credentials',
        clientId: this.configService.get('KEYCLOAK_CLIENT_ID'),
      });
      console.log('Admin authenticated');
    } catch (error) {
      console.error('Admin auth failed:', error);
      throw error;
    }
  }

  private async clientRequest(func: Function){
    try {
      await func();
    } catch (error) {
      if (error.response?.status === 401) {
        await this.refreshToken();
        await func();
      }
      throw error;
    }
  }

  async createUser(username: string, email: string, password: string) {

    try {
      return await this.adminClient.users.create({
        username,
        email,
        enabled: true,
        credentials: [{
          type: 'password',
          value: password,
          temporary: false,
        }],
      });
    } catch (error) {
      if (error.response?.status === 401) {
        await this.refreshToken();
        return await this.adminClient.users.create({
          username,
          email,
          enabled: true,
          credentials: [{
            type: 'password',
            value: password,
            temporary: false,
          }],
        });
      }
      throw error;
    }
  }

  async getUserById(userId: string) {
    try {
      return await this.adminClient.users.findOne({ id: userId });
    } catch (error) {
      if (error.response?.status === 401) {
        await this.refreshToken();
        return await this.adminClient.users.findOne({ id: userId });
      }
      throw error;
    }
  }

  private async refreshToken() {
    try {
      await this.adminClient.auth({
        grantType: 'refresh_token',
        refreshToken: this.adminClient.refreshToken,
        clientId: 'admin-cli',
      });
    } catch (error) {
      console.error('Failed to refresh token:', error);
      await this.authenticateAdmin();
    }
  }
}