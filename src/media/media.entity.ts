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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;
}
