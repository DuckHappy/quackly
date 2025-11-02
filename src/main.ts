import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';
import { AppLogger } from './utils/logging.service';
import { LoggingInterceptor } from './utils/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT ?? 3000;
  const logger = app.get(AppLogger);

  app.enableCors();

  app.useLogger(logger);
  app.useGlobalFilters(new AllExceptionsFilter(logger));
  app.useGlobalInterceptors(new LoggingInterceptor(logger));

  await app.listen(port);
  logger.log(
    `Application is running on: ${process.env.HOST ?? `http://localhost:${port}`}`,
  );
}

bootstrap();
