import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';
import { User } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 위도입니다',
    required: true,
    example: 37.566295,
  })
  @Expose()
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 경도입니다',
    required: true,
    example: 126.977945,
  })
  @Expose()
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

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
    const user = new User();
    user.latitude = this.latitude;
    user.longitude = this.longitude;
    user.isRecommendateLunch = this.isRecommendateLunch;

    return user;
  }
}
