import { Identifier, UserRepository } from '../user/repository/user.repository';
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
    if (await this.isExistUser(user)) {
      throw new ConflictException('이미 가입된 회원입니다.');
    }

    user.setHashedPassword(await this.getHashedPassword(user.password));

    const { id } = await this.userRepository.createUser(user);

    const accessToken = await this.createJwtToken({ sub: id });

    return new AccessTokenDto(accessToken);
  }

  async signIn(user: User): Promise<AccessTokenDto> {
    const id = await this.verifyUser(user);

    const accessToken = await this.createJwtToken({ sub: id });

    return new AccessTokenDto(accessToken);
  }

  async getTokenPayload(accessToken: string): Promise<JwtPayload> {
    const payload = await this.jwtService.verifyAsync<JwtPayload>(accessToken, {
      secret: process.env.JWT_SECRET,
    });

    const isExistUser = await this.isExistUser(User.byId(payload.sub));
    if (!isExistUser) throw new Error('존재하지 않는 유저입니다.');

    return payload;
  }

  private async verifyUser(user: User): Promise<number> {
    const { password: plainPassword } = user;
    const userByEmail = await this.userRepository.findUserBy({
      email: user.email,
    });

    if (
      userByEmail === null ||
      !(await this.isPasswordMatch(plainPassword, userByEmail.password))
    ) {
      throw new UnauthorizedException(
        '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
      );
    }

    return userByEmail.id;
  }

  private async isPasswordMatch(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await compare(plainPassword, hashedPassword);
  }

  private async isExistUser(user: User): Promise<boolean> {
    let identifier: Identifier;

    if (user.hasOwnProperty('id')) {
      identifier = { id: user.id };
    } else if (user.hasOwnProperty('email')) {
      identifier = { email: user.email };
    }
    return await this.userRepository.isExistBy(identifier);
  }

  private async getHashedPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  private async createJwtToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
