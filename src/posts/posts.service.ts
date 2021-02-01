import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  getAllPosts() {
    return;
  }

  createPost(createPostDto: CreatePostDto) {
    const { title, message } = createPostDto;
    return;
  }
}
