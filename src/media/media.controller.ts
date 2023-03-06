import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiExtraModels,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ApiPaginatedResponse, SwaggerPaginatedDto } from 'src/app.swagger';
import { CreateMediaDto } from './media.dto';
import { Media } from './media.entity';

@ApiTags('medias')
@Controller('medias')
@ApiExtraModels(SwaggerPaginatedDto)
export class MediaController {
  @Get()
  @ApiPaginatedResponse(Media)
  async index(
    @Query('page') page: number,
    @Query('perPage') perPage: number,
    @Query('q') query: string,
  ): Promise<Array<Media>> {
    return [];
  }

  @Get(':id')
  @ApiOkResponse({ description: 'Retrieved media.', type: Media })
  @ApiNotFoundResponse({ description: 'Media does not exist.' })
  async show(@Param('id') id: string): Promise<Media> {
    return null;
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
