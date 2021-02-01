import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAllPosts(): Promise<PostModel[]> {
    return await this.postsService.getAllPosts();
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return await this.postsService.createPost(createPostDto);
  }
}
