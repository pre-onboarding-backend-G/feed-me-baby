import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { User } from '../entity/user.entity';

export type Identifier = { id: number } | { email: string };

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  /**
   * @author 명석
   * @param identifier 유저를 db에서 조회할 때 사용하는 식별자(identifier)입니다. user의 식별자는 email(unique key, string) 또는 id(primary key, number)이고 두 식별자 모두를 함수 인자로 받아 사용할 수 있도록 구현했습니다.
   * @returns boolean을 Promise로 반환합니다.
   */
  async isExistBy(identifier: Identifier): Promise<boolean> {
    return await this.userRepository.exist({
      where: identifier,
    });
  }

  /**
   * @author 명석
   * @param identifier 유저를 db에서 조회할 때 사용하는 식별자(identifier)입니다. user의 식별자는 email(unique key, string) 또는 id(primary key, number)이고 두 식별자 모두를 함수 인자로 받아 사용할 수 있도록 구현했습니다.
   * @returns User 엔티티를 Promise로 반환합니다. user가 없을 경우 null을 반환합니다.
   */
  async findUserBy(identifier: Identifier): Promise<User> {
    return await this.userRepository.findOne({ where: identifier });
  }

  async updateUser(userId: number, user: User): Promise<boolean> {
    const result = await this.userRepository.update({ id: userId }, user);
    return result.affected > 0;
  }
}
