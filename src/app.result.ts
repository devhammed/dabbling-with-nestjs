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

export class PaginatedResultMeta {
  @ApiProperty()
  total?: number;

  @ApiProperty()
  perPage?: number;

  @ApiProperty()
  nextPage?: number;

  @ApiProperty()
  prevPage?: number;

  @ApiProperty()
  page?: number;
}

export class Result<TData> {
  @ApiProperty()
  ok: boolean;

  data: TData;
}

export class PaginatedResult<TData> extends Result<TData> {
  @ApiProperty()
  meta?: PaginatedResultMeta;
}

export const ApiResultOf = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `ResultOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(Result) },
          {
            properties: {
              data: { $ref: getSchemaPath(model) },
            },
          },
        ],
      },
    })
  );
};

export const ApiPaginatedResultOf = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResultOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(PaginatedResult) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    })
  );
};
