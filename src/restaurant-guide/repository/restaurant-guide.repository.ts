import { EntityRepository, Repository, createQueryBuilder } from 'typeorm';
import { CoordinateBoundDto } from '../dto/coordinate-bound.dto';
import { RequestCoordinateWithRangeDto } from '../dto/coordinate-req.dto';

@EntityRepository(Restaurant)
export class RestaurantRepository extends Repository<Restaurant> {
  // restaurant entity
  /**
   * @author Yeon Kyu
   * @param ( lat, lon, range)
   * @desc 맛집 데이터베이스에서 정보를 가져와서 주어진 위치 정보(위도, 경도) 범위 내의 식당들을 찾습니다.
   */

  async findRestaurantByCoordinate(dto: CoordinateBoundDto) {
    // const { minLat, maxLat, minLon, maxLon } = dto;

    const queryBuilder = createQueryBuilder()
      .getRepository(Restaurant)
      .select([
        'restaurant.id',
        'restaurant.name',
        'restaurant.category_id as type',
        'restaurant.lat',
        'restaurant.lon'
      ])

    return queryBuilder.where(
      'restaurant.lat >= :minLat AND restaurant.lat <= :maxLat AND restaurant.lon >= :minLon AND restaurant.lon <= :maxLon',
      dto
    ).getRawMany();
  }

  async findRestaurantInRange(request: RequestCoordinateWithRangeDto) {
    const dto = new CoordinateBoundDto(request.lat, request.lon, request.range)
    return await this.findRestaurantByCoordinate(dto);
    // 맛집에 대한 id, name, type, lat, lon 제공
  }
  
  async findRestaurantWithFilter(request) {
    const filteredRestaurants = (await this.findRestaurantInRange(request)).filter(restaurant => {
      const distance1 = Math.sqrt(Math.pow(Math.abs(request.lat - restaurant.lat), 2) + Math.pow(Math.abs(request.lon - restaurant.lon), 2));
      const distance2 = Math.sqrt(Math.pow(request.range, 2));
  
      return distance1 <= distance2;
    });
    return filteredRestaurants;
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
   */
}
