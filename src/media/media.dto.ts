import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { MediaStatus, MediaType } from './media.entity';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(MediaType)
  @ApiProperty({ enum: MediaType, enumName: 'MediaType' })
  type: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(MediaStatus)
  @ApiProperty({ enum: MediaStatus, enumName: 'MediaStatus' })
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateMediaDto extends PickType(CreateMediaDto, ['status']) {}
