import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMediaDto } from './media.dto';
import { Media } from './media.entity';

@Controller('medias')
export class MediaController {
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('q') query: string,
  ): Promise<Array<Media>> {
    return [];
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Media> {
    return null;
  }

  @Post()
  async create(@Body() body: CreateMediaDto): Promise<Media> {
    console.log(body);

    return null;
  }
}
