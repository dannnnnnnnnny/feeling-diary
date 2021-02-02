import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<void> {
    return await this.userRepository.signUp(signUpDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return await this.userRepository.signIn(authCredentialsDto);
  }
}
