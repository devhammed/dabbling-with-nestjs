import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    abortOnError: false,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<string>('PORT');
  const swaggerOptions = new DocumentBuilder()
    .setTitle('StereoPay API')
    .setDescription('The StereoPay API documentation.')
    .setVersion('1.0.0')
    .addTag('Medias')
    .build();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      skipMissingProperties: false,
    }),
  );

  SwaggerModule.setup(
    'api',
    app,
    SwaggerModule.createDocument(app, swaggerOptions),
  );

  await app.listen(port);
}

bootstrap();
