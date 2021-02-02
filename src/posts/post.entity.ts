import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { PostStatus } from './post-status.enum';

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  message: string;

  @Column()
  status: PostStatus;
}
