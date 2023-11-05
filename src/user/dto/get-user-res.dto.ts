import { Exclude, Expose } from 'class-transformer';
import { User } from '../entity/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class GetUserResDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _password: string;
  @Exclude() private readonly _city: string;
  @Exclude() private readonly _latitude: number;
  @Exclude() private readonly _longitude: number;
  @Exclude() private readonly _isRecommendateLunch: boolean;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt?: Date | null;
  @Exclude() private readonly _deletedAt?: Date | null;

  constructor(user: User) {
    Object.keys(user).forEach((key) => (this[`_${key}`] = user[key]));
  }

  @ApiProperty({ description: '유저의 식별자 id 입니다', example: '1' })
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty({
    description: '유저의 email 입니다',
    example: 'feed-me-admin1@naver.com',
  })
  @Expose()
  get email(): string {
    return this._email;
  }

  @ApiProperty({
    description:
      '유저가 맛집을 추천 받고자 하는 도시 이름 필드입니다. "시/군/구" 단위입니다',
    example: '서울특별시',
  })
  @Expose()
  get city(): string {
    return this._city;
  }

  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 위도입니다',
    example: 37.566295,
  })
  @Expose()
  get latitude(): number {
    return this._latitude;
  }

  @ApiProperty({
    description: '유저가 맛집 추천 받을 주소의 경도입니다',
    example: 126.977945,
  })
  @Expose()
  get longitude(): number {
    return this._longitude;
  }

  @ApiProperty({
    description: '맛집 추천을 받을지 유무에 대한 필드입니다.',
    example: true,
  })
  @Expose()
  get isRecommendateLunch(): boolean {
    return this._isRecommendateLunch;
  }

  @ApiProperty({
    description: '유저가 회원 가입한 날짜 정보입니다.',
    example: '2023-11-04T16:33:50.472Z',
  })
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }

  @ApiProperty({
    description: '유저 정보가 수정된 가장 최근 날짜의 정보입니다.',
    example: '2023-11-04T16:33:50.472Z',
  })
  @Expose()
  get updatedAt(): Date {
    return this?._updatedAt;
  }
}
