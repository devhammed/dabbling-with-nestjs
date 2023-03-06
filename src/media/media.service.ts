import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediasRepository: Repository<Media>,
  ) {}

  findAll(): Promise<Media[]> {
    return this.mediasRepository.find();
  }

  findOne(id: string): Promise<Media> {
    return this.mediasRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.mediasRepository.delete(id);
  }
}
