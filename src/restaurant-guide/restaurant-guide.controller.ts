import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { GeoJsonResponse } from './dto/geojson-res.dto';
import { GetRestaurantsDto } from './dto/get-restaurant.dto';
import { CustomGetRestaurantsGuide } from './decorator/swagger/get-restaurant-guide.decorator';

@Controller('restaurant-guide')
export class RestaurantGuideController {
  constructor(
    private readonly restaurantGuideService: RestaurantGuideService,
  ) { }
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc GeoJson에서 볼 수 있게 데이터 포맷을 변경합니다.
   */
  @Get()
  @CustomGetRestaurantsGuide()
  async getRestaurantListByQuery(
    @Query() request: RequestCoordinateWithRangeDto,
  ): Promise<GeoJsonResponse<GetRestaurantsDto>> {
    const restaurantList =
      await this.restaurantGuideService.getRestaurantList(request);
    return new GeoJsonResponse<GetRestaurantsDto>(restaurantList);
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
   *
   *
   */
  /**
   * @author Sang Un
   * @email sangunlee6@gmail.com
   * @desc [description]
   */
  @Get('city-lists')
  getCityNames(): Promise<string[]> {
    return this.restaurantGuideService.getCityNames();
  }

  // @Get('details')
  // getRestaurantDetails(): Promise<Restaurant[]> {
  //   return this.restaurantGuideService.getRestaurantDetails();
  // }
}
