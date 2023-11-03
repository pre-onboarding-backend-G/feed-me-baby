import { UserRepository } from './../user/repository/user.repository';
import { User } from '../user/entity/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpResponseDto } from './auth.controller';

interface JwtPayload {
  sub: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  //todo signUp 과정을 하나의 트랜잭션으로.
  async signUp(user: User): Promise<SignUpResponseDto> {
    if (await this.isExistUser(user)) {
      throw new ConflictException('이미 가입된 회원입니다.');
    }

    user.setHashedPassword(await this.getHashedPassword(user.password));
    console.log('user: ', user.password);

    const { id } = await this.userRepository.createUser(user);

    const accessToken = await this.createJwtToken({ sub: id });

    return { accessToken };
  }

  private async isExistUser(user: User): Promise<boolean> {
    return await this.userRepository.isExistEmail(user);
  }

  private async getHashedPassword(password: string): Promise<string> {
    return await hash(password, 10);
  }

  private async createJwtToken(payload: JwtPayload): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  //todo 유저 위도, 경도 가져오는 로직만들기 -> 맛집 목록 조회에서 사용.
}
