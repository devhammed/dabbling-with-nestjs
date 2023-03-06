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

export class ResultMeta {
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

  @ApiProperty()
  meta?: ResultMeta;

  data: TData;
}

export const ApiResult = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        title: `ApiResultOf${model.name}`,
        allOf: [
          { $ref: getSchemaPath(Result) },
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
