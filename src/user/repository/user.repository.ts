import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }

  async isExistEmail(user: User): Promise<boolean> {
    return await this.userRepository.exist({
      where: { email: user.email },
    });
  }

  async findUserBy(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }
}
