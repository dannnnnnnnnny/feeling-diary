import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Post } from './post.entity';
import { CreatePostDto } from './posts/dto/create-post.dto';

@EntityRepository(Post)
export class PostRepository extends Repository<Post> {
  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const { title, message } = createPostDto;
    const post = new Post();
    post.title = title;
    post.message = message;
    try {
      await post.save();
    } catch (error) {
      throw new InternalServerErrorException('Server Error');
    }
    return post;
  }
}
