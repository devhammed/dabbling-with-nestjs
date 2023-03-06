import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { Media } from './media.entity';

@Module({
  providers: [MediaService],
  controllers: [MediaController],
  imports: [TypeOrmModule.forFeature([Media])],
  exports: [TypeOrmModule],
})
export class MediaModule {}
