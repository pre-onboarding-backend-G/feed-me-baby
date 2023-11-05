import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { calculateDistanceBetweenCoordinates } from './const/haversine';

interface RawUser {
  email: string;
  lat: string;
  lon: string;
}

@Injectable()
export class LunchRecommendationRepository {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantGuideRepository: Repository<Restaurant>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * @author Sang Un
   * @desc [description]
   */
  async getLunchRecommendationUser(): Promise<RawUser[]> {
    const lunchRecommendationUsers = await this.userRepository
      .createQueryBuilder('users')
      .select(['users.email', 'users.latitude', 'users.longitude'])
      .where('users.is_recommendate_lunch = :isRecommendate', {
        isRecommendate: true,
      })
      .getRawMany();

    return lunchRecommendationUsers.map((user) => ({
      email: user.users_email,
      lat: user.users_latitude,
      lon: user.users_longitude,
    }));
  }

  async findRestaurantsInCircle(
    lat: number,
    lon: number,
    radius: number = 100,
  ): Promise<Restaurant[]> {
    // 경도와 위도당 변화하는 거리 계산
    const deltaLat = radius / 111200;
    const deltaLon =
      radius / ((40030000 * Math.cos((Math.PI * lat) / 180)) / 360);

    const minLat = lat - deltaLat;
    const maxLat = lat + deltaLat;
    const minLon = lon - deltaLon;
    const maxLon = lon + deltaLon;

    // DB에서 후보군 조회
    const candidateRestaurants = await this.restaurantGuideRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.latitude BETWEEN :minLat AND :maxLat', {
        minLat,
        maxLat,
      })
      .andWhere('restaurant.longitude BETWEEN :minLon AND :maxLon', {
        minLon,
        maxLon,
      })
      .getMany();

    // 후보군 내에서 반경 내에 있는 음식점만 도출
    const restaurantsWithinRadius = candidateRestaurants.filter(
      (restaurant) => {
        const distance = calculateDistanceBetweenCoordinates(
          lat,
          lon,
          restaurant.latitude,
          restaurant.longitude,
        );
        return distance < radius;
      },
    );

    return restaurantsWithinRadius;
  }
}
