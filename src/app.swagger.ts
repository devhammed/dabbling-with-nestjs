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

export class SwaggerPaginatedMeta {
  @ApiProperty()
  total: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  page: number;
}

export class SwaggerPaginatedData<TData> {
  data: TData[];

  @ApiProperty()
  meta: SwaggerPaginatedMeta;
}

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model: TModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(SwaggerPaginatedData) },
        ],
      },
    }),
  );
};
