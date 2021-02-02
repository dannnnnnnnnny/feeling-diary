import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/posts/post.entity';
import { PostRepository } from 'src/posts/post.repository';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';

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
    const found = this.postRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return found;
  }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    return this.postRepository.createPost(createPostDto);
  }

  async deletePost(id: number): Promise<void> {
    const result = await this.postRepository.delete(id);
    if (!result.affected) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  }
  // updatePost(id: string, createPostDto: CreatePostDto) {
  //   const { title, message } = createPostDto;

  //   const post = this.getPostId(id);

  //   if (title) {
  //     post.title = title;
  //   }
  //   if (message) {
  //     post.message = message;
  //   }

  //   return post;
  // }

  // deletePost(id: string): void {
  //   this.getPostId(id);
  //   this.posts = this.posts.filter((post) => post.id !== id);
  // }
}
