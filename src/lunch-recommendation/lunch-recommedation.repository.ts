import { RestaurantGuideRepository } from './../restaurant-guide/repository/restaurant-guide.repository';
import { Injectable } from '@nestjs/common';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { calculateDistanceBetweenCoordinates } from './const/haversine';

@Injectable()
export class LunchRecommendationRepository {
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
  ) {}

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
    const candidateRestaurants =
      await this.restaurantGuideRepository.candidateRestaurants(
        minLat,
        minLon,
        maxLat,
        maxLon,
      );

    // 후보군 내에서 반경 내에 있는 음식점만 도출
    const restaurantsWithinRadius = candidateRestaurants.filter(
      (restaurant) => {
        const distance = calculateDistanceBetweenCoordinates(
          lat,
          lon,
          restaurant.lat,
          restaurant.lon,
        );
        return distance < radius;
      },
    );

    return restaurantsWithinRadius;
  }
}
