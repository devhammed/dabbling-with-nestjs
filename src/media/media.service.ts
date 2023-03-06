import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediasRepository: Repository<Media>
  ) {}

  async findAll(query: {
    page?: number;
    perPage?: number;
    keyword?: string;
  }): Promise<{
    medias: Media[];
    total: number;
    perPage: number;
    page: number;
  }> {
    const perPage = query.perPage || 10;
    const page = query.page || 1;
    const skip = (page - 1) * perPage;
    const keyword = query.keyword || '';
    const [medias, total] = await this.mediasRepository.findAndCount({
      where: { name: Like(`%${keyword}%`) },
      order: { name: 'DESC' },
      take: perPage,
      skip: skip,
    });

    return { medias, total, perPage, page };
  }

  async findOne(id: string): Promise<Media> {
    return this.mediasRepository.findOneBy({ id });
  }

  async remove(id: string): Promise<void> {
    await this.mediasRepository.delete(id);
  }
}
