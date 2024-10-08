import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {

  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Allow only DTOs properties
    forbidNonWhitelisted: true,
    transform: true, // Transform DTOs into instances
  }));

  const config = new DocumentBuilder()
    .setTitle('Book Hub')
    .setDescription('The booking Hub API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  Logger.verbose(`Server running on port ${app.getHttpServer().address().port}`);
}
bootstrap();
