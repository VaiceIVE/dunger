import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Декоратор, извлекает объект пользователя из запроса.
 *
 * Используется внутри контроллеров для доступа к данным, добавленным Guard'ом,
 * например, из `JwtStrategy.validate`, где объект `user` помещается в `request.user`.
 *
 * Пример использования:
 *
 * @Get('me')
 * getProfile(@CurrentUser() user: AuthenticatedUser) {
 *   return user;
 * }
 */
export const CurrentUser = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // сюда guard должен положить объект user из токена
  },
);
