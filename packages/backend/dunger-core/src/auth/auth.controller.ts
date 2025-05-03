import { Controller, Post, Body } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Инциализация пользователя в системе
   */
  @Post('signup')
  async signUp(
    @Body() body: { username: string; email: string; password: string },
  ) {
    return this.userService.createUser(
      body.username,
      body.email,
      body.password,
    );
  }

  /**
   * Авторизация в системе
   */
  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    return this.authService.login(body.username, body.password);
  }

  /**
   * Обновление токенов авторизации по refresh токену
   */
  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.regenerateTokens(body.refreshToken);
  }
}
