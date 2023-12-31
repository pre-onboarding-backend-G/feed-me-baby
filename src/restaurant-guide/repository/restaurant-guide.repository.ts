import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoordinateBoundDto } from '../dto/coordinate-bound.dto';
import { Restaurant } from '../../restaurant/entity/restaurant.entity';
import { City } from '../../restaurant/entity/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GetRawRestaurants } from '../dto/get-restaurant.dto';

@Injectable()
export class RestaurantGuideRepository {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantGuideRepository: Repository<Restaurant>,
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>,
  ) {}
  /**
   * @author Yeon Kyu
   * @param ( lat, lon, range )
   * @desc 맛집 데이터베이스에서 정보를 가져와서 주어진 위치 정보(위도, 경도) 사각형 범위 내의 식당들을 찾습니다.
   */

  async findRestaurantsInRange(
    lat: number,
    lon: number,
    range: number,
  ): Promise<GetRawRestaurants[]> {
    const { minLat, maxLat, minLon, maxLon } = new CoordinateBoundDto(
      lat,
      lon,
      range,
    );
    const queryBuilder =
      this.restaurantGuideRepository.createQueryBuilder('restaurant');

    return queryBuilder
      .select([
        'restaurant.id as id',
        'restaurant.name as name',
        'restaurant.lat as lat',
        'restaurant.lon as lon',
      ])
      .where(
        'lat >= :minLat AND lat <= :maxLat AND lon >= :minLon AND lon <= :maxLon',
        { minLat, maxLat, minLon, maxLon },
      )
      .getRawMany();
  }

  async candidateRestaurants(
    minLat: number,
    minLon: number,
    maxLat: number,
    maxLon: number,
  ): Promise<Restaurant[]> {
    return await this.restaurantGuideRepository
      .createQueryBuilder('restaurant')
      .where('restaurant.lat BETWEEN :minLat AND :maxLat', {
        minLat,
        maxLat,
      })
      .andWhere('restaurant.lon BETWEEN :minLon AND :maxLon', {
        minLon,
        maxLon,
      })
      .getMany();
  }

  /**
   * @author Sang Un
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */
  async getCityNames(): Promise<string[]> {
    const cityNames = await this.cityRepository
      .createQueryBuilder('city')
      .select('city.name')
      .getRawMany();

    return cityNames.map((entry) => entry.city_name);
  }
}
