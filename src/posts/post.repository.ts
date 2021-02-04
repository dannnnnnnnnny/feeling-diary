import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';
import { User } from 'src/auth/entity/user.entity';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  private logger = new Logger('PostRepository');
  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    const { title, message, status } = createPostDto;
    const post = new Post();
    post.title = title;
    post.message = message;
    post.status = status;
    post.user = user;
    try {
      await post.save();
      delete post.user;
    } catch (error) {
      this.logger.error(
        `Failed to create post for "${user.username}"`,
        error.stack,
      );
      throw new InternalServerErrorException('Server Error');
    }
    return post;
  }

  async getPosts(filterDto: GetPostsFilterDto, user: User): Promise<Post[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('post');

    query.where('post.userId = :userId', { userId: user.id });

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
      this.logger.error(
        `Failed to get tasks for user "${user.username}", DTO: ${JSON.stringify(
          filterDto,
        )}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}
