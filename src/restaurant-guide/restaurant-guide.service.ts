import { Injectable } from '@nestjs/common';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { RestaurantEntity } from './restaurant-guide.entity';

@Injectable()
export class RestaurantGuideService {
  //리포지토리 주입
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */
  /**
   * 맛집 목록 api (query param 3개) (유저 기본 위도, 경도) -> 연규
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
  constructor(
    private readonly restaurantGuideRepository: RestaurantGuideRepository,
  ) {}
  getDistricts(): Promise<string[]> {
    return this.restaurantGuideRepository.getDistricts();
  }

  // 임시 메서드
  createRestaurantInfo(district: string): Promise<RestaurantEntity> {
    return this.restaurantGuideRepository.createRestaurantInfo(district);
  }

  getRestaurantDetails(): Promise<RestaurantEntity[]> {
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
