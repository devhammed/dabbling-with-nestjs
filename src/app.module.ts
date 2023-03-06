import { Module } from '@nestjs/common';
import { MediasController } from './medias/medias.controller';

@Module({
  imports: [],
  controllers: [MediasController],
  providers: [],
})
export class AppModule {}
