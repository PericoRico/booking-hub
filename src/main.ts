import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Allow only DTOs properties
    forbidNonWhitelisted: true,
    transform: true, // Transform DTOs into instances
  }));
  await app.listen(3000);
  Logger.log('Server running on port 3000');
}
bootstrap();
