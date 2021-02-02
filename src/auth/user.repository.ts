import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // 회원가입
  async signUp(signUpDto: SignUpDto): Promise<void> {
    const { username, password, nickname } = signUpDto;

    const user = new User();
    user.username = username;
    user.nickname = nickname;
    user.salt = await bcrypt.genSalt(); // $2b$10$RiXWjJNwOEaKD5UhatiEne 같은 암호
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('Username already exists.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  // 로그인
  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ where: { username } });

    if (user?.validatePassword(password)) {
      // console.log(user.username);
      return user.username;
    } else {
      return null;
    }
  }

  // 비밀번호 암호화 메소드
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
