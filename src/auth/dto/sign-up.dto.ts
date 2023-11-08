import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { User, UserCreateProps } from '../../user/entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({
    description:
      '유저가 로그인에 사용할 email 필드입니다. 회원가입이 가능한 이메일의 도메인이 정해져 있습니다. 또한, 도메인을 포함한 아이디는 최소 10자, 최대 60자 까지 가능하며, 소문자 알파벳 및 숫자를 사용할 수 있고 -, _ 등의 특수문자를 사용할 수 있습니다. ',
    required: true,
    example: 'feed-me-admin1@naver.com',
  })
  @Expose()
  @IsNotEmpty()
  @IsEmail({
    host_whitelist: [
      'gmail.com',
      'naver.com',
      'daum.net',
      'kakao.com',
      'feed-me.com',
    ],
    domain_specific_validation: true,
    allow_utf8_local_part: false,
    ignore_max_length: true,
  })
  @MinLength(10)
  @MaxLength(60)
  email: string;

  @ApiProperty({
    description:
      '유저가 로그인에 사용할 password 필드입니다. 소문자, 대문자 알파벳과 숫자, 특수문자를 포함하여 최소 8자 이상, 최대 30자 까지 가능합니다.',
    required: true,
    example: 'Feed-me1!',
  })
  @Expose()
  @IsNotEmpty()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @MaxLength(30)
  password: string;

  @ApiProperty({
    description:
      '유저가 맛집을 추천 받고자 하는 도시 이름 필드입니다. "시/군/구" 단위의 주소를 입력합니다',
    required: true,
    example: '서울특별시',
  })
  @Expose()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 위도입니다',
    required: true,
    example: 37.566295,
  })
  @Expose()
  @IsNotEmpty()
  @IsLatitude()
  lat: number;

  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 경도입니다',
    required: true,
    example: 126.977945,
  })
  @Expose()
  @IsNotEmpty()
  @IsLongitude()
  lon: number;

  @ApiProperty({
    description: '맛집 추천을 받을지 유무에 대한 필드입니다.',
    required: true,
    example: true,
  })
  @Expose()
  @IsNotEmpty()
  @IsBoolean()
  isRecommendateLunch: boolean;

  toEntity(): User {
    const userProps: UserCreateProps = {
      email: this.email,
      password: this.password,
      city: this.city,
      lat: this.lat,
      lon: this.lon,
      isRecommendateLunch: this.isRecommendateLunch,
    };

    return User.create(userProps);
  }
}
