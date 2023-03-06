import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateMediaDto } from './media.dto';
import { Media } from './media.entity';

@Controller('medias')
export class MediaController {
  @Get()
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('q') query: string,
  ): Promise<Array<Media>> {
    return [];
  }

  @Get(':id')
  async show(@Param('id') id: string): Promise<Media> {
    return null;
  }

  @Post()
  async store(@Body() body: CreateMediaDto): Promise<Media> {
    console.log(body);

    return null;
  }
}
