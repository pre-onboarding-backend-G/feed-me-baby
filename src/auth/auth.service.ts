import { UserRepository } from '../user/repository/user.repository';
import { User } from '../user/entity/user.entity';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenDto } from './dto/access-token.dto';

/**
 * jwt는 userId를 sub의 value로 생성합니다.
 * @prop {Number} sub - user id
 * @author 명석
 */
export interface JwtPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  //todo signUp 과정을 하나의 트랜잭션으로.
  async signUp(user: User): Promise<AccessTokenDto> {
    if (await this.userRepository.isExist(user)) {
      throw new ConflictException('이미 가입된 회원입니다.');
    }

    user.setHashedPassword(await hash(user.password, 10));

    const savedUser = await this.userRepository.save(user);

    const accessToken = await this.jwtService.signAsync({ sub: savedUser.id });

    return new AccessTokenDto(accessToken);
  }

  async signIn(user: User): Promise<AccessTokenDto> {
    const userByEmail: User | null = await this.userRepository.findUserBy(user);

    if (userByEmail === null) {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
      );
    }

    const isSamePassword: boolean = await compare(
      user.password,
      userByEmail.password,
    );

    if (!isSamePassword) {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
      );
    }

    const accessToken = await this.jwtService.signAsync({
      sub: userByEmail.id,
    });

    return new AccessTokenDto(accessToken);
  }

  async getTokenPayload(accessToken: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
      secret: process.env.JWT_SECRET,
    });

    const isExistUser = await this.userRepository.isExist(
      User.byId(payload.sub),
    );

    if (!isExistUser) throw new Error('존재하지 않는 유저입니다.');

    return payload;
  }
}
