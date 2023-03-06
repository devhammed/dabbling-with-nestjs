import { Controller, Get, Param, Query } from '@nestjs/common';

@Controller('medias')
export class MediasController {
  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('q') query: string,
  ): Promise<string> {
    return 'Hello World!';
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `This action returns a #${id} cat`;
  }
}
