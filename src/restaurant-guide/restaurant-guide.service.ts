import { Injectable } from '@nestjs/common';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { GetRestaurantListDto } from './dto/get-restaurant.dto';

@Injectable()
export class RestaurantGuideService {
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
  ) {}
  //리포지토리 주입
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */

  async getRestaurantList(
    request: RequestCoordinateWithRangeDto,
  ): Promise<GetRestaurantListDto[]> {
    const { lat, lon, validateRange } = request;
    const restaurants =
      await this.restaurantGuideRepository.findRestaurantsInRange(
        lat,
        lon,
        validateRange,
      );
    return restaurants.map(
      (restaurant) =>
        new GetRestaurantListDto(
          restaurant.id,
          restaurant.name,
          restaurant.lat,
          restaurant.lon,
        ),
    );
  }
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  /**
   * @author Sang Un
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */
  // constructor(
  //   private readonly restaurantGuideRepository: RestaurantGuideRepository,
  // ) { }

  getDistricts(): Promise<string[]> {
    return this.restaurantGuideRepository.getDistricts();
  }

  // 임시 메서드
  createRestaurantInfo(district: string): Promise<Restaurant> {
    return this.restaurantGuideRepository.createRestaurantInfo(district);
  }

  getRestaurantDetails(): Promise<Restaurant[]> {
    return this.restaurantGuideRepository.getRestaurantDetails();
  }
  /**
   * 시군구 메서드 + 상세정보 api 메서드 + 맛집 평점 메서드 (+ 맛집 목록 api) -> 상운님
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
}
