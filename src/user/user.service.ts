import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User, UserUpdateProps } from './entity/user.entity';
import { GetUserResDto } from './dto/get-user-res.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUser(userId: number): Promise<GetUserResDto> {
    const user = await this.userRepository.findUserBy(User.byId(userId));
    if (user === null) throw new NotFoundException('유저가 존재하지 않습니다.');
    return new GetUserResDto(user);
  }

  async updateUser(userId: number, props: UserUpdateProps): Promise<string> {
    const isUpdated = await this.userRepository.updateUser(
      userId,
      User.updateBy(props),
    );
    if (!isUpdated) throw new NotFoundException('유저가 존재하지 않습니다.');

    return '사용자 정보 업데이트 성공';
  }
}
