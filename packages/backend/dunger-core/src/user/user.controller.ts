import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Получить данные текущего авторизованного пользователя.
   *
   * Этот эндпоинт защищён JWT-гвардом и возвращает информацию о пользователе,
   * идентификатор которого извлекается из токена.
   *
   * @param user - объект текущего пользователя, извлечённый из JWT payload
   * @returns TODO: ApiUser
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserById(@CurrentUser() user) {
    return this.userService.getUserById(user.id);
  }
}
