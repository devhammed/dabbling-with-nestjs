import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum MediaType {
  IMAGE = 'image',
  AUDIO = 'audio',
}

export enum MediaStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity()
export class Media {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @ApiProperty({ enum: MediaType, enumName: 'MediaType' })
  type: string;

  @Column()
  @ApiProperty({ enum: MediaStatus, enumName: 'MediaStatus' })
  status: string;
}
