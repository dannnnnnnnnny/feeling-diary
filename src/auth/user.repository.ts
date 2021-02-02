import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password, nickname } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.nickname = nickname;
    user.salt = await bcrypt.genSalt(); // $2b$10$RiXWjJNwOEaKD5UhatiEne 같은 암호
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }

  // 비밀번호 암호화 메소드
  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
