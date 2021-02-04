import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
  private logger = new Logger('PostController');
  constructor(private postsService: PostsService) {}

  @Get('/:id')
  getPostId(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    this.logger.verbose(`Searching for ${user.username}'s post ${id}}`);
    return this.postsService.getPostById(id, user);
  }

  @Get()
  getPosts(
    @Query(ValidationPipe) filterDto: GetPostsFilterDto,
    @GetUser() user: User,
  ): Promise<PostEntity[]> {
    this.logger.verbose(
      `Retrieving all of ${user.username}'s posts. [Filter] : ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.postsService.getPosts(filterDto, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createPost(
    @Body() createPostDto: CreatePostDto,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    this.logger.verbose(`Creating for ${user.username}'s post`);
    return this.postsService.createPost(createPostDto, user);
  }

  @Delete('/:id')
  deletePost(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`Deleting for ${user.username}'s post`);
    return this.postsService.deletePost(id, user);
  }

  @Patch('/:id')
  patchPost(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', PostStatusValidationPipe) status: PostStatus,
    @GetUser() user: User,
  ): Promise<PostEntity> {
    this.logger.verbose(`Patching for ${user.username}'s post`);
    return this.postsService.updatePostStatus(id, status, user);
  }
}
