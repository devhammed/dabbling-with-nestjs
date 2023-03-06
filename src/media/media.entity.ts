import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export enum MediaType {
  IMAGE = 'image',
  AUDIO = 'audio',
}

export enum MediaStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

@Entity({ name: 'medias' })
export class Media {
  @ApiProperty({ format: 'uuid' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column()
  name: string;

  @Column()
  @ApiProperty({ enum: MediaType, enumName: 'MediaType' })
  type: string;

  @Column()
  @ApiProperty({ enum: MediaStatus, enumName: 'MediaStatus' })
  status: string;

  @Column()
  @ApiProperty({ format: 'url' })
  url: string;

  @Column()
  @ApiProperty()
  description: string;

  @CreateDateColumn()
  @ApiProperty()
  createdAt?: Date;

  @UpdateDateColumn()
  @ApiProperty()
  updatedAt?: Date;

  @DeleteDateColumn()
  @ApiProperty()
  deletedAt?: Date;
}
