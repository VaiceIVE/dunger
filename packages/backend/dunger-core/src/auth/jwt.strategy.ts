import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from './types';

/**
 * JwtStrategy обрабатывает JWT-аутентификацию через Passport с использованием токенов Keycloak.
 *
 * - Извлекает токен из заголовка Authorization (Bearer).
 * - Проверяет подпись токена с помощью публичных ключей Keycloak (через JWKS).
 * - Проверяет соответствие `issuer` (URL до Keycloak + realm).
 *
 * Не использует использовать client_id административного клиента (например, admin-cli) в качестве audience (`aud`),
 * так как он не содержит пользовательские поля, необходимые для контекста `CurrentUser`,
 * включая `preferred_username` или `realm_access.roles`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    const keycloakUrl = configService.get('KEYCLOAK_URL');
    const realm = configService.get('KEYCLOAK_REALM');

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: keycloakUrl + '/realms/' + realm,
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: `${keycloakUrl}/realms/${realm}/protocol/openid-connect/certs`,
        cache: true,
        rateLimit: true,
      }),
    });
  }

  /**
   * Метод validate вызывается после успешной валидации токена.
   * Возвращает объект пользователя, сохраняемый в контексте запроса (Request.user).
   *
   * @param payload - Декодированный JWT payload
   * @returns объект с id, username и списком ролей
   */
  async validate(payload: JwtPayload) {
    return {
      id: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles || [],
    };
  }
}
