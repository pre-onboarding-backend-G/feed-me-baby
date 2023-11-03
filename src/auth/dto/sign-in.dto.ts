import { User } from './../../user/entity/user.entity';
import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {
  toEntity(): User {
    const user = new User();

    Object.entries(this).forEach(([key, value]) => {
      user[key] = value;
    });

    return user;
  }
}
