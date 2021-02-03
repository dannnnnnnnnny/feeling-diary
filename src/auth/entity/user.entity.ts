import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrpyt from 'bcryptjs';
import { Post } from 'src/posts/entity/post.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  salt: string;

  @OneToMany((type) => Post, (post) => post.user, { eager: true })
  posts: Post[];

  async validatePassword(password: string): Promise<boolean> {
    return await bcrpyt.hash(password, this.salt);
  }
}
