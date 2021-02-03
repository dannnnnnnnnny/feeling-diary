import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entity/user.entity';
import { Post } from 'src/posts/entity/post.entity';
import { PostRepository } from 'src/posts/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';
import { PostStatus } from './post-status.enum';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  async getPosts(filterDto: GetPostsFilterDto, user: User): Promise<Post[]> {
    return await this.postRepository.getPosts(filterDto, user);
  }

  async getPostById(id: number, user: User): Promise<Post> {
    const found = await this.postRepository.findOne({
      where: { id, userId: user.id },
    });
    if (!found) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return found;
  }

  async createPost(createPostDto: CreatePostDto, user: User): Promise<Post> {
    return await this.postRepository.createPost(createPostDto, user);
  }

  async deletePost(id: number, user: User): Promise<void> {
    await this.getPostById(id, user);
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  async updatePostStatus(
    id: number,
    status: PostStatus,
    user: User,
  ): Promise<Post> {
    const post = await this.getPostById(id, user);
    post.status = status;
    await post.save();
    return post;
  }
}
