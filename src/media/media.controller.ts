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
  ApiPaginatedResponseOf,
  ApiResponseOf,
  ApiPaginatedResponse,
  ApiResponse,
  ApiResponseStatus,
} from 'src/app.response';

@ApiTags('medias')
@Controller('medias')
@ApiExtraModels(Media)
@ApiExtraModels(ApiResponse)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiPaginatedResponseOf(Media)
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('query') query: string
  ): Promise<ApiPaginatedResponse<Media[]>> {
    const result = await this.mediaService.findAll({
      page,
      perPage,
      query,
    });
    const lastPage = Math.ceil(result.total / perPage);
    const nextPage = page + 1 > lastPage ? null : page + 1;
    const prevPage = page - 1 < 1 ? null : page - 1;

    return {
      status: ApiResponseStatus.SUCCESS,
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
  @ApiResponseOf(Media)
  @ApiNotFoundResponse({ description: 'Media not found.' })
  async show(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Media>> {
    const media = await this.mediaService.findOne(id);

    if (!media) {
      return {
        status: ApiResponseStatus.ERROR,
        message: 'Media not found.',
      };
    }

    return {
      status: ApiResponseStatus.SUCCESS,
      data: media,
    };
  }

  @Post()
  @ApiResponseOf(Media)
  @ApiBadRequestResponse({ description: 'Validation errors.' })
  @ApiInternalServerErrorResponse({ description: 'Unable to create media.' })
  async store(@Body() body: CreateMediaDto): Promise<ApiResponse<Media>> {
    const media = await this.mediaService.create(body);

    if (!media) {
      return {
        status: ApiResponseStatus.ERROR,
        message: 'Unable to create media.',
      };
    }

    return {
      status: ApiResponseStatus.SUCCESS,
      message: 'Media created.',
      data: media,
    };
  }
}
