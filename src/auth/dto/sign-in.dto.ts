import { User } from '../../user/entity/user.entity';
import { PickType } from '@nestjs/swagger';
import { SignUpDto } from './sign-up.dto';

export class SignInDto extends PickType(SignUpDto, ['email', 'password']) {
  toEntity(): User {
    const props = {
      email: this.email,
      password: this.password,
    };

    return User.of(props);
  }
}
