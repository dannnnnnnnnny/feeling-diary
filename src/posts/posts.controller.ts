import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
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

  @Get('/:id')
  async getPostId(@Param('id') id: string): Promise<PostModel> {
    return await this.postsService.getPostId(id);
  }

  @Post()
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return await this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  async deletePost(@Param('id') id: string): Promise<void> {
    return await this.postsService.deletePost(id);
  }
}
