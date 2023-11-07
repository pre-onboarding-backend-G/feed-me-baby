import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { GeoJsonResponse } from './dto/geojson-res.dto';
import { GetRestaurantsDto } from './dto/get-restaurant.dto';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

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
   * @desc GeoJson에서 볼 수 있게 데이터 포맷을 변경합니다.
   */
  @Get()
  @ApiOperation({ summary: '주변 맛집 정보들을 가져옵니다' })
  @ApiQuery({ name: 'lat', type: Number, description: '위도 값' })
  @ApiQuery({ name: 'lon', type: Number, description: '경도 값' })
  @ApiQuery({
    name: 'range',
    type: Number,
    description: '찾고싶은 범위 0.1(약 11km) 이하의 값을 입력(기본 값: 0.1)',
  })
  @ApiResponse({
    status: 200,
    type: GetRestaurantsDto,
    isArray: true,
    description: 'geojson에 넣을 수 있는 데이터 포맷을 따릅니다',
  })
  @ApiResponse({ status: 400, description: '위도나 경도 값이 없습니다' })
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
