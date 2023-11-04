import { Expose } from 'class-transformer';
import {
  IsBoolean,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
} from 'class-validator';
import { User } from '../entity/user.entity';

export class UpdateUserReqDto {
  @Expose()
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @Expose()
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

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
