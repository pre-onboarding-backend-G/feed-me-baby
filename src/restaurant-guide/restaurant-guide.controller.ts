import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RestaurantEntity } from './restaurant-guide.entity';

@Controller('restaurant-guide')
export class RestaurantGuideController {
  constructor(
    private readonly restaurantGuideService: RestaurantGuideService,
  ) {}
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */
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
  @Get('districts')
  getDistricts(): Promise<string[]> {
    return this.restaurantGuideService.getDistricts();
  }

  @Post('district')
  createRestaurantInfo(
    @Body('district') district: string,
  ): Promise<RestaurantEntity> {
    return this.restaurantGuideService.createRestaurantInfo(district);
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
   */
}
