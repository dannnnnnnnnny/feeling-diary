import { User } from 'src/auth/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostStatus } from '../post-status.enum';

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

  @ManyToOne((type) => User, (user) => user.posts, { eager: false })
  user: User;

  @Column()
  userId: number;
}
