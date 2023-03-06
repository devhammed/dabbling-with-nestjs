import { Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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
    const media = this.mediasRepository.create({
      ...data,
      createdAt: new Date(),
    });

    return this.mediasRepository.save(media);
  }

  async update(id: string, data: UpdateMediaDto): Promise<Media> {
    const media = await this.findOne(id);

    if (!media) {
      throw new NotFoundException('Media not found.');
    }

    media.status = data.status;

    media.updatedAt = new Date();

    return this.mediasRepository.save(media);
  }

  async remove(id: string): Promise<void> {
    const media = await this.findOne(id);

    if (!media) {
      throw new NotFoundException('Media not found.');
    }

    await this.mediasRepository.softDelete(media.id);
  }
}
