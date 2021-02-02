import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { PostStatus } from '../post-status.enum';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  message: string;

  @IsNotEmpty()
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
}

// dto는 interface보다 class를 권장 (interface는 컴파일 후 유지X)
// dto는 필수항목은 아니지만, dto를 사용함으로써 코드를 쉽게 유지, 리팩토링이 가능해짐

/*
@IsNotEmpty()
- yarn add class-validator class-transformer
- 유효성 검사 기능
*/
