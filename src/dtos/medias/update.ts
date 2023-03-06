import { CreateMediaDto } from './create';
import { PickType } from '@nestjs/mapped-types';

export class UpdateCatAgeDto extends PickType(CreateMediaDto, [
  'status',
] as const) {}
