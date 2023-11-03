import { Injectable } from '@nestjs/common';
import { RestaurantEntity } from '../restaurant-guide.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RestaurantGuideRepository {
  // restaurant entity
  // review entity
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

  #restaurantGuideRepository: Repository<RestaurantEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.#restaurantGuideRepository =
      this.dataSource.getRepository(RestaurantEntity);
  }

  // getDistricts(): Promise<RestaurantEntity[]> {
  //   return this.#restaurantGuideRepository.find();
  // }

  async getDistricts(): Promise<string[]> {
    const distinctDistricts = await this.#restaurantGuideRepository
      .createQueryBuilder('restaurant')
      .select('DISTINCT(restaurant.district)', 'district')
      .getRawMany();

    // 직접 결과를 반환합니다. 각 객체는 'district' 키를 가지고 있습니다.
    return distinctDistricts;
  }

  createRestaurantInfo(district: string): Promise<RestaurantEntity> {
    const restaurantInfo = this.#restaurantGuideRepository.create({ district });

    return this.#restaurantGuideRepository.save(restaurantInfo);
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
   */
}
