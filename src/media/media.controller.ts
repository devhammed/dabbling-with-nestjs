import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiQuery,
  ApiTags,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Media } from './media.entity';
import { CreateMediaDto, UpdateMediaDto } from './media.dto';
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
@ApiExtraModels(ApiPaginatedResponse)
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Get()
  @ApiPaginatedResponseOf(Media)
  @ApiQuery({
    name: 'page',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'perPage',
    required: false,
    type: Number,
  })
  @ApiQuery({
    name: 'query',
    required: false,
    type: String,
  })
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
      throw new NotFoundException('Media not found.');
    }

    return {
      status: ApiResponseStatus.SUCCESS,
      data: media,
    };
  }

  @Post()
  @ApiResponseOf(Media)
  @ApiUnprocessableEntityResponse({ description: 'Validation errors.' })
  @ApiInternalServerErrorResponse({ description: 'Unable to create media.' })
  async store(@Body() body: CreateMediaDto): Promise<ApiResponse<Media>> {
    const media = await this.mediaService.create(body);

    if (!media) {
      throw new InternalServerErrorException('Unable to create media.');
    }

    return {
      status: ApiResponseStatus.SUCCESS,
      message: 'Media created.',
      data: media,
    };
  }

  @Patch(':id')
  @ApiResponseOf(Media)
  @ApiNotFoundResponse({ description: 'Media not found.' })
  @ApiUnprocessableEntityResponse({ description: 'Validation errors.' })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateMediaDto
  ): Promise<ApiResponse<Media>> {
    const updatedMedia = await this.mediaService.update(id, body);

    return {
      status: ApiResponseStatus.SUCCESS,
      message: 'Media updated.',
      data: updatedMedia,
    };
  }

  @Delete(':id')
  @ApiOkResponse({ description: 'Media deleted.' })
  @ApiNotFoundResponse({ description: 'Media not found.' })
  async destroy(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<ApiResponse<Media>> {
    await this.mediaService.remove(id);

    return {
      status: ApiResponseStatus.SUCCESS,
      message: 'Media deleted.',
    };
  }
}
