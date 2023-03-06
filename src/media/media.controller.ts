import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiResult, Result } from 'src/app.result';
import { CreateMediaDto } from './media.dto';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@ApiTags('medias')
@Controller('medias')
@ApiExtraModels(Result)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiResult(Media)
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('q') keyword: string
  ): Promise<Result<Media[]>> {
    const result = await this.mediaService.findAll({
      page,
      perPage,
      keyword,
    });
    const lastPage = Math.ceil(result.total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      ok: true,
      meta: {
        total: result.total,
        page: result.page,
        perPage: result.perPage,
        nextPage,
        prevPage,
      },
      data: result.medias,
    };
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved media.', type: Media })
  @ApiNotFoundResponse({ description: 'Media does not exist.' })
  async show(@Param('id') id: string): Promise<Media> {
    return this.mediaService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({
    type: Media,
    description: 'The media has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  async store(@Body() body: CreateMediaDto): Promise<Media> {
    console.log(body);

    return null;
  }
}
