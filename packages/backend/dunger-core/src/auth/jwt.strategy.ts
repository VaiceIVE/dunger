import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      issuer: 'https://keycloak.dunger.site/realms/master',
      audience: 'admin-cli',
      algorithms: ['RS256'],
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        jwksUri: 'https://keycloak.dunger.site/realms/master/protocol/openid-connect/certs',
        cache: true,
        rateLimit: true,
      }),
    });
  }

  async validate(payload: any) {
    console.log('JWT payload:', payload);
    return {
      id: payload.sub,
      username: payload.preferred_username,
      roles: payload.realm_access?.roles || [],
    };
  }
}
