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
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { userInfo } from 'os';
import { User } from 'src/auth/entity/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Post as PostEntity } from 'src/posts/entity/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostsFilterDto } from './dto/get-filter-filter.dto';
import { PostStatusValidationPipe } from './pipes/post-status-validation.pipe';
import { PostStatus } from './post-status.enum';
import { PostsService } from './posts.service';

@Controller('posts')
@UseGuards(AuthGuard())
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  getPostId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.getPostById(id, user);
  }

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @GetUser() user: User,
  ): Promise<PostEntity[]> {
    return this.postsService.getPosts(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.postsService.deletePost(id, user);
  }

  @Patch('/:id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) status: PostStatus,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    return this.postsService.updatePostStatus(id, status, user);
  }
}
