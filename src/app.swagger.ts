import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiProperty,
  DocumentBuilder,
  getSchemaPath,
} from '@nestjs/swagger';

export const swaggerOptions = new DocumentBuilder()
  .setTitle('StereoPay API')
  .setDescription('The StereoPay API documentation.')
  .setVersion('1.0.0')
  .addTag('medias')
  .build();

export class SwaggerPaginatedDto<TData> {
  @ApiProperty()
  total: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  offset: number;

  results: TData[];
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(SwaggerPaginatedDto) },
          {
            properties: {
              results: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
  );
};
