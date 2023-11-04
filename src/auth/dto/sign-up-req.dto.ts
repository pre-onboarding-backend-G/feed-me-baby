import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User } from '../../user/entity/user.entity';

export class SignUpReqDto {
  @Expose()
  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  @MaxLength(60)
  email: string;

  @Expose()
  @IsNotEmpty()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(30)
  password: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isRecommendateLunch: boolean;

  toEntity(): User {
    const user = new User();

    Object.entries(this).forEach(([key, value]) => {
      user[key] = value;
    });

    return user;
  }
}
