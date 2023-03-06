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

  @Column({
    type: 'enum',
    enum: MediaType,
  })
  @ApiProperty({ enum: MediaType, enumName: 'MediaType' })
  type: MediaType;

  @Column({
    type: 'enum',
    enum: MediaStatus,
  })
  @ApiProperty({ enum: MediaStatus, enumName: 'MediaStatus' })
  status: MediaStatus;

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
