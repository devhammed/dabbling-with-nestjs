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

export class ApiPaginatedResponseMeta {
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

export enum ApiResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error',
}

export class ApiResponse<TData> {
  @ApiProperty()
  status: ApiResponseStatus;

  @ApiProperty()
  message?: string;

  data?: TData;
}

export class ApiPaginatedResponse<TData> extends ApiResponse<TData> {
  @ApiProperty()
  meta?: ApiPaginatedResponseMeta;
}

export const ApiResponseOf = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `ResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(ApiResponse) },
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

export const ApiPaginatedResponseOf = <TModel extends Type<any>>(
  model: TModel
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `PaginatedResponseOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(ApiPaginatedResponse) },
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
