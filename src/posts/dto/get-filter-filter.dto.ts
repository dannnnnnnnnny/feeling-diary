import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { PostStatus } from '../post-status.enum';

export class GetPostsFilterDto {
  @IsOptional()
  @IsIn([
    PostStatus.JOY,
    PostStatus.HAPPY,
    PostStatus.FUNNY,
    PostStatus.ANGER,
    PostStatus.DISGUST,
    PostStatus.FEAR,
    PostStatus.SAD,
  ])
  status: PostStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
