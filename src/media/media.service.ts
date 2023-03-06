import { Like, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private mediasRepository: Repository<Media>
  ) {}

  async findAll(params: {
    page?: number;
    perPage?: number;
    query?: string;
  }): Promise<{
    medias: Media[];
    total: number;
    perPage: number;
    page: number;
  }> {
    const perPage = params.perPage || 10;
    const page = params.page || 1;
    const skip = (page - 1) * perPage;
    const keyword = params.query || '';
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

  async create(data: CreateMediaDto): Promise<Media> {
    try {
      const media = this.mediasRepository.create(data);

      const savedMedia = await this.mediasRepository.save(media);

      return savedMedia;
    } catch {
      return null;
    }
  }

  async update(id: string, data: UpdateMediaDto): Promise<boolean> {
    try {
      await this.mediasRepository.update(id, data);

      return true;
    } catch {
      return false;
    }
  }

  async remove(id: string): Promise<boolean> {
    try {
      await this.mediasRepository.delete(id);

      return true;
    } catch {
      return false;
    }
  }
}
