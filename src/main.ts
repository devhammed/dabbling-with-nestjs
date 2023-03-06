import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationException } from './app.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');
  const swaggerOptions = new DocumentBuilder()
    .setTitle('StereoPay API')
    .setDescription('The StereoPay API documentation.')
    .setVersion('1.0.0')
    .addTag('medias')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      stopAtFirstError: true,
      skipMissingProperties: false,
      exceptionFactory: (errors) => new ValidationException(errors),
    })
  );

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, swaggerOptions)
  );

  await app.listen(port);
}

bootstrap();
