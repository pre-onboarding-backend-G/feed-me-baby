import { User } from '../../user/entity/user.entity';
import { PickType } from '@nestjs/swagger';
import { SignUpReqDto } from './sign-up-req.dto';

export class SignInReqDto extends PickType(SignUpReqDto, [
  'email',
  'password',
]) {
  toEntity(): User {
    const user = new User();

    Object.entries(this).forEach(([key, value]) => {
      user[key] = value;
    });

    return user;
  }
}
