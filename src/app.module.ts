import { Module } from '@nestjs/common';
import { MediaController } from './media/media.controller';

@Module({
  imports: [],
  controllers: [MediaController],
  providers: [],
})
export class AppModule {}
