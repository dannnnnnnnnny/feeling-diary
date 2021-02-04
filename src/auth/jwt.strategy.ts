import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { User } from './entity/user.entity';
import { UserRepository } from './user.repository';
import { JwtPayload } from './jwt-payload.interface';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 요청으로부터 Bearer jwt 추출
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret'),
    });
  }

  // @UseGuards() 붙은 메소드들은 validate()를 거치며 Token을 검증함
  async validate(payload: JwtPayload): Promise<User> {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}

// validate()
// jwt 전략 사용시 passport는 jwt 서명을 json으로 decode하고 validate() 호출
// 서명한 유저가 유효한지 검증. validate의 return으로 정보들이 들어있는 객체를 Request 객체에 반환
// 검증은 passport, jwt 서명은 auth.service에서

// @UseGuards() 데코레이터가 붙은 메소드들은 validate()를 거쳐 BearerToken을 추출
// 검증 후 user 객체를 리턴하면 Request 객체에 들어가게 됨
// Req 객체에서 user 객체 정보만 확인하고자 할 때 커스텀 데코레이터를 이용해서 Request 객체에서 user 객체만 추출할 수 있음.
