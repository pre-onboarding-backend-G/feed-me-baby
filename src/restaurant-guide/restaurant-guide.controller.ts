import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { Restaurant } from '../restaurant/entity/restaurant.entity';
import { GeoJsonResponseDto } from './dto/geojson-response.dto';
import { GetRestaurantListDto } from './dto/get-restaurant.dto';

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
  @Get()
  async getRestaurantListByQuery(
    @Query() request: RequestCoordinateWithRangeDto,
  ): Promise<GeoJsonResponseDto<GetRestaurantListDto>> {
    const restaurantList =
      await this.restaurantGuideService.getRestaurantList(request);
    return new GeoJsonResponseDto<GetRestaurantListDto>(restaurantList);
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
  ): Promise<Restaurant> {
    return this.restaurantGuideService.createRestaurantInfo(district);
  }

  @Get('details')
  getRestaurantDetails(): Promise<Restaurant[]> {
    return this.restaurantGuideService.getRestaurantDetails();
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
