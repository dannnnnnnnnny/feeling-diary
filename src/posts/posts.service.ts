import { Injectable, NotFoundException } from '@nestjs/common';
import { uuid } from 'uuidv4';
import { CreatePostDto } from './dto/create-post.dto';
import { PostModel } from './posts.model';

@Injectable()
export class PostsService {
  private posts: PostModel[] = [];

  getAllPosts(): PostModel[] {
    return this.posts;
  }

  getPostId(id: string): PostModel {
    const found = this.posts.find((post) => post.id === id);
    if (!found) {
      throw new NotFoundException(`Post With ID ${id} not found`);
    }
    return found;
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

  updatePost(id: string, createPostDto: CreatePostDto) {
    const { title, message } = createPostDto;

    const post = this.getPostId(id);

    if (title) {
      post.title = title;
    }
    if (message) {
      post.message = message;
    }

    return post;
  }

  deletePost(id: string): void {
    this.getPostId(id);
    this.posts = this.posts.filter((post) => post.id !== id);
  }
}
