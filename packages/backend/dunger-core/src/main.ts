import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { errorHandler } from './common/errors';
import { AllExceptionsFilter } from './common/errors/AllExceptionsFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(3000);
}
bootstrap();
