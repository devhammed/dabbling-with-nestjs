import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, ApiProperty, getSchemaPath } from '@nestjs/swagger';

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
  @ApiProperty({
    enum: ApiResponseStatus,
    enumName: 'ApiResponseStatus',
  })
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
