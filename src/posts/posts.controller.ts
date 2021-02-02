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
import { Post as PostEntity } from 'src/posts/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';
import { PostStatusValidationPipe } from './pipes/post-status-validation.pipe';
import { PostStatus } from './post-status.enum';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  async getPostId(@Param('id', ParseIntPipe) id: number): Promise<PostEntity> {
    return await this.postsService.getPostById(id);
  }

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
  ): Promise<PostEntity[]> {
    return this.postsService.getPosts(filterDto);
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

  @Patch('/:id')
  async patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) status: PostStatus,
  ): Promise<PostEntity> {
    return await this.postsService.updatePostStatus(id, status);
  }
}
