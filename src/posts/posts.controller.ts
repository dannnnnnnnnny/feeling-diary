import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  // @Get()
  // async getAllPosts(): Promise<PostModel[]> {
  //   return await this.postsService.getAllPosts();
  // }

  // @Get('/:id')
  // async getPostId(@Param('id') id: string): Promise<PostModel> {
  //   return await this.postsService.getPostId(id);
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
