import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateMediaDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['audio', 'image'])
  type: string;

  @IsNotEmpty()
  @IsString()
  @IsEnum(['active', 'inactive'])
  status: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
