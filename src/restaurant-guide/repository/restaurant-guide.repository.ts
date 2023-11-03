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

    return distinctDistricts;
  }

  createRestaurantInfo(district: string): Promise<RestaurantEntity> {
    const restaurantInfo = this.#restaurantGuideRepository.create({ district });

    return this.#restaurantGuideRepository.save(restaurantInfo);
  }

  async getRestaurantDetails(): Promise<RestaurantEntity[]> {
    const restaurantDetails = await this.#restaurantGuideRepository
      .createQueryBuilder('restaurant')
      // Query 수정해야함
      .select('DISTINCT(restaurant.district)', 'district')
      .getRawMany();

    return restaurantDetails;
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
