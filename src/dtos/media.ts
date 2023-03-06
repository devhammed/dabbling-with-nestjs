import { PickType } from '@nestjs/mapped-types';
import { MediaStatus, MediaType } from 'src/enums/media';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(MediaType)
  type: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(MediaStatus)
  status: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateMediaDto extends PickType(CreateMediaDto, [
  'status',
] as const) {}
