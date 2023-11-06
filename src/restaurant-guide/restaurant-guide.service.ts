import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { GetRawRestaurants, GetRestaurantsDto } from './dto/get-restaurant.dto';

@Injectable()
export class RestaurantGuideService {
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
  ) { }

  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc 쿼리 파라미터에서 지정한 위도, 경도, 범위 값을 가지고
   *       맛집 목록을 가져온 다음 원의 크기로 필터링 합니다.
   */

  async getRestaurantList(
    request: RequestCoordinateWithRangeDto,
  ): Promise<GetRestaurantsDto[]> {
    const { lat, lon, validateRange } = request;

    const restaurantResults =
      await this.restaurantGuideRepository.findRestaurantsInRange(
        lat,
        lon,
        validateRange,
      );

    if (restaurantResults.length === 0) {
      throw new NotFoundException('주변에 맛집이 없습니다! 안타깝군요!');
    }

    const filteredRestaurants = this.filterRestaurantsByDistance(
      request,
      restaurantResults,
    );

    return filteredRestaurants.map(
      (restaurant) => new GetRestaurantsDto(restaurant),
    );
  }

  private filterRestaurantsByDistance(
    request: RequestCoordinateWithRangeDto,
    restaurants: GetRawRestaurants[],
  ): GetRawRestaurants[] {
    return restaurants.filter((restaurant) => {
      const distance1 = Math.sqrt(
        Math.pow(request.lat - restaurant.lat, 2) +
        Math.pow(request.lon - restaurant.lon, 2),
      );
      const distance2 = Math.sqrt(Math.pow(request.validateRange, 2));

      return distance1 <= distance2;
    });
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
   * @email sangunlee6@gmail.com
   * @desc [description]
   */
  getCityNames(): Promise<string[]> {
    return this.restaurantGuideRepository.getCityNames();
  }

  // getRestaurantDetails(): Promise<Restaurant[]> {
  //   return this.restaurantGuideRepository.getRestaurantDetails();
  // }
}
