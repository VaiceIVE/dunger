import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import passport from 'passport';
import { JwtStrategy } from './auth/jwt.strategy';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({origin: '*'})
  await app.listen(3000);
}
bootstrap();
