import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './utils/app.logger';
import { AllExceptionsFilter } from './utils/all-exceptions.filter';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const logger = new AppLogger();
  const app = await NestFactory.create(AppModule, { logger });
  
  app.enableCors();

  app.useGlobalFilters(new AllExceptionsFilter(logger));
  
  
  await app.listen(port);
  logger.log(`Application is running on: ${process.env.HOST ?? `http://localhost:${port}`}`);
}

bootstrap();
