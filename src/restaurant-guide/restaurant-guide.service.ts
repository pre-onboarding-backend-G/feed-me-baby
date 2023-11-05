import { BadRequestException, Injectable } from '@nestjs/common';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { GetRestaurantsDto } from './dto/get-restaurant.dto';

@Injectable()
export class RestaurantGuideService {
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
  ) {}
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

    // TODO: 위, 경도 값이 주어지지 않았을 때 유저의 위치값 넣기

    if (!lat || !lon) {
      throw new BadRequestException('사용자의 위치 정보가 없습니다');
    }

    const restaurants =
      await this.restaurantGuideRepository.findRestaurantsInRange(
        lat,
        lon,
        validateRange,
      );

    return restaurants
      .filter((restaurant) => {
        const distance1 = Math.sqrt(
          Math.pow(Math.abs(lat - restaurant.lat), 2) +
            Math.pow(Math.abs(lon - restaurant.lon), 2),
        );
        const distance2 = Math.sqrt(Math.pow(validateRange, 2));

        return distance1 <= distance2;
      })
      .map((restaurant) => new GetRestaurantsDto(restaurant));
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
