import { Injectable } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {
  private posts: PostModel[] = [];

  getAllPosts(): PostModel[] {
    return this.posts;
  }

  createPost(createPostDto: CreatePostDto): PostModel {
    const { title, message } = createPostDto;

    const post: PostModel = {
      id: uuid(),
      title,
      message,
    };

    this.posts.push(post);
    return post;
  }
}
