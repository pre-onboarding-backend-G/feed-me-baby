import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { Restaurant } from './entity/restaurant.entity';
import axios from 'axios';
import { SingleBar, Presets } from 'cli-progress';
import { CityRepository } from './city.repository';
import { CategoryRepository } from './category.repository';

@Injectable()
export class RestaurantService {
  private activeCount = 0;
  private closedCount = 0;
  private noDataCount = 0;
  private progressBar = new SingleBar({}, Presets.shades_classic);

  constructor(
    private restaurantRepository: RestaurantRepository,
    private cityRepository: CityRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  async updateRestaurants(): Promise<void> {
    let index = 1;
    const batchSize = 10; // 한 번에 처리할 페이지 수
    const delayBetweenPages = 2000; // 페이지 사이 딜레이 (밀리초)
    this.progressBar.start(500, 0);

    while (true) {
      const promises = [];
      for (let i = 0; i < batchSize; i++) {
        promises.push(this.processPage(index + i));
      }

      const results = await Promise.all(promises);

      if (results.every((result) => result === false)) {
        break; // 모든 결과가 false이면 종료
      }

      index += batchSize;
      this.progressBar.update(index); // 실제 진행 상황에 따라 업데이트

      await this.delay(delayBetweenPages);
    }

    this.progressBar.stop();
    console.log(
      `최종 처리된 식당 수: 저장된 식당 ${this.activeCount}, 폐업된 식당 ${this.closedCount}, 데이터 없음 ${this.noDataCount}`,
    );
  }

  private async processPage(pageIndex: number): Promise<boolean> {
    const url = `https://openapi.gg.go.kr/GENRESTRT?KEY=${process.env.API_KEY}&Type=json&pIndex=${pageIndex}&pSize=1000`;
    const response = await axios.get(url);
    const data = response.data;

    if (!data.GENRESTRT || !data.GENRESTRT[1] || !data.GENRESTRT[1].row) {
      return false;
    }

    const restaurants = data.GENRESTRT[1].row;
    for (const restaurantData of restaurants) {
      const {
        UNITY_BSN_STATE_NM: businessState,
        MANAGE_NO: uniqueId,
        BIZPLC_NM: name,
        REFINE_ROADNM_ADDR: address,
        REFINE_WGS84_LAT: latitude,
        REFINE_WGS84_LOGT: longitude,
        LOCPLC_FACLT_TELNO: telephone,
        SANITTN_BIZCOND_NM: category,
        REFINE_LOTNO_ADDR: lotnoAddress,
        SIGUN_NM: cityName,
      } = restaurantData;

      if (
        businessState === '폐업' ||
        !name ||
        !address ||
        !latitude ||
        !longitude
      ) {
        if (businessState === '폐업') {
          this.closedCount++;
        } else {
          this.noDataCount++;
        }
        continue;
      }

      // 도시와 카테고리 데이터가 존재하는지 확인하고, 없으면 생성
      let cityInstance;
      if (cityName) {
        cityInstance = await this.cityRepository.findOne({
          where: { name: cityName },
        });
        if (!cityInstance) {
          cityInstance = await this.cityRepository.createOne({
            name: cityName,
          });
        }
      }

      let categoryInstance;
      if (category) {
        categoryInstance = await this.categoryRepository.findOne({
          where: { name: category },
        });
        if (!categoryInstance) {
          categoryInstance = await this.categoryRepository.createOne({
            name: category,
          });
        }
      }

      if (!cityInstance || !categoryInstance) {
        this.noDataCount++;
        continue;
      }

      const cleanedTelephone = telephone ? telephone.replace(/\s/g, '') : null;
      let finalTelephone;

      if (cleanedTelephone) {
        const startsWith031 = cleanedTelephone.startsWith('031');
        const startsWith032 = cleanedTelephone.startsWith('032');
        const startsWith02 = cleanedTelephone.startsWith('02');
        const startsWith070 = cleanedTelephone.startsWith('070');
        const startsWith050 = cleanedTelephone.startsWith('050');

        if (
          startsWith031 ||
          startsWith032 ||
          startsWith02 ||
          startsWith070 ||
          startsWith050
        ) {
          finalTelephone = cleanedTelephone;
        } else {
          finalTelephone = `031${cleanedTelephone}`;
        }
      } else {
        finalTelephone = null;
      }
      const finalAddress = address || lotnoAddress;

      const createOrUpdateDto = {
        uniqueId,
        name,
        address: finalAddress,
        latitude,
        longitude,
        telephone: finalTelephone,
        categoryId: categoryInstance.id,
        cityId: cityInstance.id,
      };

      try {
        const existingRestaurant = await this.restaurantRepository.findOne({
          where: { uniqueId },
        });
        if (existingRestaurant) {
          await this.restaurantRepository.updateRestaurant(
            uniqueId,
            createOrUpdateDto,
          );
        } else {
          await this.restaurantRepository.createRestaurant(createOrUpdateDto);
        }
        this.activeCount++;
      } catch (error) {
        console.error(`레스토랑 처리 중 오류 (${uniqueId}):`, error);
      }
    }

    return true;
  }

  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async softDeleteRestaurant(uniqueId: string): Promise<void> {
    return this.restaurantRepository.softDeleteRestaurant(uniqueId);
  }

  async updateRestaurant(
    uniqueId: string,
    updateRestaurantDto,
  ): Promise<Restaurant> {
    return this.restaurantRepository.updateRestaurant(
      uniqueId,
      updateRestaurantDto,
    );
  }
}
