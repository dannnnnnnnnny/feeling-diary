import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, message, status } = createPostDto;
    const post = new Post();
    post.title = title;
    post.message = message;
    post.status = status;
    try {
      await post.save();
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
    return post;
  }

  async getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('post');

    if (status) {
      query.andWhere('post.status = :status', { status });
    }
    if (search) {
      query.andWhere('(post.title LIKE :search OR post.message LIKE :search)', {
        search: `%${search}%`, // 부분 일치
      });
    }

    try {
      const posts = query.getMany();
      return posts;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
