import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Post as PostEntity } from 'src/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  async getPostId(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return await this.postsService.getPostById(id);
  }

  @Get()
  getPosts(): Promise<PostEntity[]> {
    return this.postsService.getPosts();
  }

  @Post()
  @UsePipes(ValidationPipe)
  async createPost(@Body() createPostDto: CreatePostDto): Promise<PostEntity> {
    return await this.postsService.createPost(createPostDto);
  }

  @Delete('/:id')
  async deletePost(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return await this.postsService.deletePost(id);
  }

  // @Get()
  // async getAllPosts(): Promise<PostModel[]> {
  //   return await this.postsService.getAllPosts();
  // }

  // @Post()
  // @UsePipes(ValidationPipe)
  // async createPost(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
  //   return await this.postsService.createPost(createPostDto);
  // }

  // @Patch('/:id')
  // async updatePost(
  //   @Param('id') id: string,
  //   @Body() createPostDto: CreatePostDto,
  // ) {
  //   return await this.postsService.updatePost(id, createPostDto);
  // }

  // @Delete('/:id')
  // async deletePost(@Param('id') id: string): Promise<void> {
  //   return await this.postsService.deletePost(id);
  // }
}
