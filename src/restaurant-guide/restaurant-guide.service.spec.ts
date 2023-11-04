import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';
import { BadRequestException } from '@nestjs/common';
import {
  Geometry,
  GetRawRestaurants,
  GetRestaurantsDto,
} from './dto/get-restaurant.dto';

describe('RestaurantGuideService', () => {
  let restaurantGuideService: RestaurantGuideService;

  beforeEach(async () => {
    const restaurants: GetRawRestaurants[] = [
      {
        id: 4300,
        name: '디새골',
        lon: 127.101829,
        lat: 37.1261173,
      },
    ];

    const findRestaurantsInRangeMock = jest.fn<
      Promise<GetRawRestaurants[]>,
      [number, number, number]
    >();
    findRestaurantsInRangeMock.mockResolvedValue(restaurants);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RestaurantGuideService,
        {
          provide: RestaurantGuideRepository,
          useValue: {
            findRestaurantsInRange: findRestaurantsInRangeMock,
          },
        },
      ],
    }).compile();

    restaurantGuideService = module.get<RestaurantGuideService>(
      RestaurantGuideService,
    );
  });

  it('should be defined', () => {
    expect(restaurantGuideService).toBeDefined();
  });

  describe('getRestaurantList', () => {
    it('위치 정보가 없으면 BadRequestException를 반환 합니다', async () => {
      const request: RequestCoordinateWithRangeDto = { validateRange: 0.1 };
      try {
        await restaurantGuideService.getRestaurantList(request);
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toEqual('사용자의 위치 정보가 없습니다');
      }
    });

    it('위치 정보가 있으면 맛집의 이름, 위도, 경도를 반환 하고 geojson형식에 맞춥니다.', async () => {
      const request: RequestCoordinateWithRangeDto = {
        lat: 37.123,
        lon: 127.123,
        validateRange: 0.1,
      };

      const result: GetRestaurantsDto[] =
        await restaurantGuideService.getRestaurantList(request);

      result.forEach((restaurant) => {
        expect(restaurant).toBeInstanceOf(GetRestaurantsDto);
        expect(restaurant.id).toBeGreaterThan(0);
        expect(restaurant.name).not.toBeUndefined();
        expect(restaurant.geometry).toBeInstanceOf(Geometry);
        expect(restaurant.geometry.coordinates).toBeInstanceOf(Array);
      });
    });
    /**
     * @author Sang Un
     * @email suntail2002@naver.com
     * @create date 2023-11-01 22:56:10
     * @modify date 2023-11-01 22:56:10
     * @desc [description]
     */

    // 대충  메서드 작성

    // 대충  메서드 작성
  });
});
