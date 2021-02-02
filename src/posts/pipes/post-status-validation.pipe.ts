import { BadRequestException, PipeTransform } from '@nestjs/common';
import { PostStatus } from '../post-status.enum';

export class PostStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    PostStatus.ANGER,
    PostStatus.DISGUST,
    PostStatus.FEAR,
    PostStatus.FUNNY,
    PostStatus.HAPPY,
    PostStatus.JOY,
    PostStatus.SAD,
  ];

  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is an invalid status`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.allowedStatuses.indexOf(status);
    return index !== -1;
  }
}
