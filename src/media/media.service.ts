import { Like, Repository } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
import { ApiPaginatedResponseMeta } from 'src/app.response';

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
    meta: ApiPaginatedResponseMeta;
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
    const lastPage = Math.ceil(total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return { medias, meta: { total, page, perPage, nextPage, prevPage } };
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
