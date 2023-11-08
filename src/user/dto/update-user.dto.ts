import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';
import { UserUpdateProps } from '../entity/user.entity';
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

  getProps(): UserUpdateProps {
    return {
      lat: this.lat,
      lon: this.lon,
      isRecommendateLunch: this.isRecommendateLunch,
    };
  }
}
