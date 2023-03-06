import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validateAppConfig } from './app.config';
import { MediaModule } from './media/media.module';
import { ValidationExceptionFilter } from './app.exception';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateAppConfig,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        autoLoadEntities: true,
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        database: configService.get('DB_NAME'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
      }),
    }),
    MediaModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter,
    },
  ],
})
export class AppModule {}
