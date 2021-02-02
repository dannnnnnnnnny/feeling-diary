import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  username: string;

  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[a-zA-Z]).*$/) // 특수문자 1개 이상, 숫자, 문자 들어가야함 ex) abcd1234!
  password: string;

  @IsNotEmpty()
  nickname: string;
}
