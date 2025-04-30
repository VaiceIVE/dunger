import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { errorHandler } from './common/errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.use(errorHandler);
  await app.listen(3000);
}
bootstrap();
