import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { ApiArrayResultOf, Result } from 'src/app.result';
import { CreateMediaDto } from './media.dto';
import { Media } from './media.entity';
import { MediaService } from './media.service';

@ApiTags('medias')
@Controller('medias')
@ApiExtraModels(Result)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiArrayResultOf(Media)
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('query') query: string
  ): Promise<Result<Media[]>> {
    const result = await this.mediaService.findAll({
      page,
      perPage,
      query,
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
  @ApiOkResponse({ description: 'Retrieved media.', type: Result<Media> })
  @ApiNotFoundResponse({ description: 'Media not found.' })
  async show(
    @Param('id', ParseUUIDPipe) id: string,
    @Res() res: Response
  ): Promise<Result<Media> | Response> {
    const media = await this.mediaService.findOne(id);

    if (!media) {
      return res.status(404).json({
        ok: false,
        message: 'Media not found.',
      });
    }

    return {
      ok: true,
      data: media,
    };
  }

  @Post()
  @ApiCreatedResponse({
    type: Media,
    description: 'The media has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiInternalServerErrorResponse({ description: 'Unable to create media.' })
  async store(
    @Body() body: CreateMediaDto,
    @Res() res: Response
  ): Promise<Media | Response> {
    const media = await this.mediaService.create(body);

    if (!media) {
      return res.status(500).json({
        ok: false,
        message: 'Unable to create media.',
      });
    }

    return media;
  }
}
