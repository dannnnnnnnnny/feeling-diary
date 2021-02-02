import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
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

  async getPosts(filterDto: GetPostsFilterDto): Promise<Post[]> {
    return await this.postRepository.getPosts(filterDto);
  }

  async getPostById(id: number): Promise<Post> {
    const found = await this.postRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return found;
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return await this.postRepository.createPost(createPostDto);
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }

  async updatePostStatus(id: number, status: PostStatus): Promise<Post> {
    const post = await this.getPostById(id);
    post.status = status;
    await post.save();
    return post;
  }
}
