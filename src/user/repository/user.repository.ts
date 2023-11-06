import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere } from 'typeorm';
import { User } from '../entity/user.entity';

export type FindUserOptionWhere =
  | { id: number }
  | { email: string } extends FindOptionsWhere<User>
  ? { id: number } | { email: string }
  : never;

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async isExist(user: User): Promise<boolean> {
    const where: FindUserOptionWhere = this.getFindUserOptionsWhere(user);
    return await this.userRepository.exist({ where });
  }

  async findUserBy(user: User): Promise<User> {
    const where: FindUserOptionWhere = this.getFindUserOptionsWhere(user);
    return await this.userRepository.findOne({ where });
  }

  async updateUser(userId: number, user: User): Promise<boolean> {
    const result = await this.userRepository.update({ id: userId }, user);
    return result.affected > 0;
  }

  /**
   * @author 명석
   * @param identifier 유저를 db에서 조회할 때 사용하는 식별자(identifier)입니다. user의 식별자는 email(unique key, string) 또는 id(primary key, number)이고 두 식별자 모두를 함수 인자로 받아 사용할 수 있도록 구현했습니다. id가 있다면 id를 우선 식별자로 리턴합니다.
   * @returns boolean을 Promise로 반환합니다.
   */
  private getFindUserOptionsWhere(user: User): FindUserOptionWhere {
    let identifier: FindUserOptionWhere;

    if (user.hasOwnProperty('id')) {
      identifier = { id: user.id };
    } else if (user.hasOwnProperty('email')) {
      identifier = { email: user.email };
    }
    return identifier;
  }
}
