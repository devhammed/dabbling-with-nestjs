import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, IsUrl } from 'class-validator';
import { MediaStatus, MediaType } from './media.entity';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsEnum(MediaType)
  @ApiProperty({ enum: MediaType, enumName: 'MediaType' })
  type: MediaType;

  @IsEnum(MediaStatus)
  @ApiProperty({ enum: MediaStatus, enumName: 'MediaStatus' })
  status: MediaStatus;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  url: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateMediaDto extends PickType(CreateMediaDto, ['status']) {}
