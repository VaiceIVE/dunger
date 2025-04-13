import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AuthService {
    constructor(
        private readonly configService: ConfigService
    ){}
  private readonly keycloakUrl = this.configService.get('KEYCLOAK_URL');
  private readonly realm = this.configService.get('KEYCLOAK_REALM');
  private readonly clientId = this.configService.get('KEYCLOAK_CLIENT_ID');
  private readonly clientSecret = this.configService.get('KEYCLOAK_CLIENT_SECRET'); 

  async login(username: string, password: string) {
    const params = new URLSearchParams();
    params.append('grant_type', 'password');
    params.append('client_id', this.clientId);
    params.append('username', username);
    params.append('password', password);
    params.append('client_secret', this.clientSecret);

    const { data } = await axios.post(
      `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`,
      params,
      { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
    );

    return {
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
    };
  }
}
