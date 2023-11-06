import { Injectable, NotFoundException } from '@nestjs/common';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { GetRestaurantsDto } from './dto/get-restaurant.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class RestaurantGuideService {
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
    private readonly userService: UserService
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
    userId: number,
    request: RequestCoordinateWithRangeDto,
  ): Promise<GetRestaurantsDto[]> {
    const { lat, lon, validateRange } = request;

    if (!lat || !lon) {
      const { latitude, longitude } = await this.userService.getUser(userId);
      request.lat = Number(latitude)
      request.lon = Number(longitude)
    }

    const restaurants =
      await this.restaurantGuideRepository.findRestaurantsInRange(
        request.lat,
        request.lon,
        validateRange,
      );

    if (restaurants.length === 0) {
      throw new NotFoundException('위치 정보가 없거나 주변에 맛집이 없습니다! 안타깝군요!')
    }

    return restaurants
      .filter((restaurant) => {
        const distance1 = Math.sqrt(
          Math.pow(Math.abs(request.lat - restaurant.lat), 2) +
          Math.pow(Math.abs(request.lon - restaurant.lon), 2),
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
