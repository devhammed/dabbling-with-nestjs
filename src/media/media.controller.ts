import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Media } from './media.entity';
import { CreateMediaDto } from './media.dto';
import { MediaService } from './media.service';
import {
  ApiPaginatedResultOf,
  ApiResultOf,
  PaginatedResult,
  Result,
} from 'src/app.result';

@ApiTags('medias')
@Controller('medias')
@ApiExtraModels(Media)
@ApiExtraModels(Result)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiPaginatedResultOf(Media)
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('query') query: string
  ): Promise<PaginatedResult<Media[]>> {
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
  @ApiResultOf(Media)
  @ApiNotFoundResponse({ description: 'Media not found.' })
  async show(@Param('id', ParseUUIDPipe) id: string): Promise<Result<Media>> {
    const media = await this.mediaService.findOne(id);

    if (!media) {
      throw new NotFoundException();
    }

    return {
      ok: true,
      data: media,
    };
  }

  @Post()
  @ApiResultOf(Media)
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiInternalServerErrorResponse({ description: 'Unable to create media.' })
  async store(@Body() body: CreateMediaDto): Promise<Result<Media>> {
    const media = await this.mediaService.create(body);

    if (!media) {
      throw new InternalServerErrorException();
    }

    return {
      ok: true,
      data: media,
    };
  }
}
