import { Injectable } from '@nestjs/common';
import { RestaurantRepository } from './restaurant.repository';
import { SingleBar, Presets } from 'cli-progress';
import { CityRepository } from './city.repository';
import { CategoryRepository } from './category.repository';
import axios from 'axios';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { RestaurantApiResponseDto } from './dto/restaurant-api-response.dto.ts';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.ts';
import { Restaurant } from './entity/restaurant.entity';

@Injectable()
export class RestaurantService {
  private activeCount = 0;
  private closedCount = 0;
  private noDataCount = 0;
  private maxRetries = 5;
  private retryDelay = 1000;
  private progressBar = new SingleBar({}, Presets.shades_classic);

  constructor(
    private restaurantRepository: RestaurantRepository,
    private cityRepository: CityRepository,
    private categoryRepository: CategoryRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  async syncRestaurantData(): Promise<void> {
    let index = 1;
    const batchSize = 10;
    const delayBetweenPages = 2000;
    this.progressBar.start(500, 0);

    while (true) {
      const promises = [];
      for (let i = 0; i < batchSize; i++) {
        promises.push(this.processRestaurantDataPage(index + i));
      }

      const results = await Promise.allSettled(promises);
      let fulfilledCount = 0;

      for (const result of results) {
        if (result.status === 'fulfilled') {
          fulfilledCount++;
          if (result.value === false) {
            this.progressBar.stop();
            console.log(
              `최종 처리된 식당 수: 저장된 식당 ${this.activeCount}, 폐업된 식당 ${this.closedCount}, 데이터 없음 ${this.noDataCount}`,
            );
            return;
          }
        } else if (result.status === 'rejected') {
          console.error('페이지 처리 중 오류 발생:', result.reason);
        }
      }

      if (fulfilledCount === 0) {
        break;
      }

      index += batchSize;
      this.progressBar.update(index);
      await this.delayForNextBatch(delayBetweenPages);
    }

    this.progressBar.stop();
    console.log(
      `최종 처리된 식당 수: 저장된 식당 ${this.activeCount}, 폐업된 식당 ${this.closedCount}, 데이터 없음 ${this.noDataCount}`,
    );
  }

  private async processRestaurantDataPage(
    pageIndex: number,
    retryCount = 5,
  ): Promise<boolean> {
    const url = `https://openapi.gg.go.kr/GENRESTRT?KEY=${process.env.API_KEY}&Type=json&pIndex=${pageIndex}&pSize=1000`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (!data.GENRESTRT || !data.GENRESTRT[1] || !data.GENRESTRT[1].row) {
        return false;
      }

      await this.entityManager.transaction(
        async (transactionalEntityManager) => {
          await this.handleDatabaseOperations(
            data.GENRESTRT[1].row,
            transactionalEntityManager,
          );
        },
      );

      return true;
    } catch (error) {
      if (this.shouldRetry(error)) {
        const delay = this.retryDelay + Math.random() * 1000;
        // console.error(
        //   `트랜잭션 실패, 재시도 ${retryCount + 1}/${this.maxRetries}:`,
        //   error,
        // );
        await new Promise((resolve) => setTimeout(resolve, delay));

        if (retryCount < this.maxRetries) {
          return this.processRestaurantDataPage(pageIndex, retryCount + 1);
        } else {
          console.error(
            `트랜잭션 최종 재시도 실패, 페이지 ${pageIndex}:`,
            error,
          );
          throw error;
        }
      } else {
        console.error(`트랜잭션 실패, 페이지 ${pageIndex}:`, error);
        throw error;
      }
    }
  }

  private shouldRetry(error: any): boolean {
    return (
      (error.response && error.response.status === 503) ||
      error.code === '23505'
    );
  }

  private async handleDatabaseOperations(
    restaurants: RestaurantApiResponseDto[],
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    for (const restaurantData of restaurants) {
      await this.processSingleRestaurantData(
        restaurantData,
        transactionalEntityManager,
      );
    }
  }

  private async processSingleRestaurantData(
    restaurantData: RestaurantApiResponseDto,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
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

    const existingRestaurant = await this.restaurantRepository.findByUniqueId(
      uniqueId,
      transactionalEntityManager,
    );

    // 폐업 상태일 때의 처리
    if (businessState === '폐업') {
      if (existingRestaurant && !existingRestaurant.deletedAt) {
        await this.restaurantRepository.softDeleteRestaurant(
          uniqueId,
          transactionalEntityManager,
        );
      }
      this.closedCount++;
      return;
    }

    // 필수 정보가 없는 경우 처리
    if (!name || !address || !latitude || !longitude) {
      this.noDataCount++;
      return;
    }

    // 문자열을 숫자로 변환
    const parsedLatitude = parseFloat(latitude);
    const parsedLongitude = parseFloat(longitude);

    // 변환된 숫자가 유효하지 않으면 처리 중단
    if (isNaN(parsedLatitude) || isNaN(parsedLongitude)) {
      console.error(
        `Invalid latitude or longitude value: ${latitude}, ${longitude}`,
      );
      this.noDataCount++;
      return;
    }

    const cityInstance = await this.cityRepository.findOrCreate(
      cityName,
      transactionalEntityManager,
    );
    const categoryInstance = await this.categoryRepository.findOrCreate(
      category,
      transactionalEntityManager,
    );

    // 도시 또는 카테고리 인스턴스가 생성되지 않았으면 처리 중단
    if (!cityInstance || !categoryInstance) {
      this.noDataCount++;
      return;
    }

    // 전화번호 정제
    const cleanedTelephone = telephone ? telephone.replace(/\s/g, '') : null;
    let finalTelephone =
      cleanedTelephone && this.validateAndFormatTelephone(cleanedTelephone);

    // 최종 주소 결정 (도로명 주소가 우선, 없으면 지번 주소 사용)
    const finalAddress = address || lotnoAddress;

    // 업데이트 DTO 구성
    const updateDto: UpdateRestaurantDto = {
      uniqueId,
      name,
      address: finalAddress,
      latitude: parsedLatitude,
      longitude: parsedLongitude,
      telephone: finalTelephone,
      city: cityInstance,
      category: categoryInstance,
    };

    // 식당 데이터 생성 또는 업데이트
    await this.createOrUpdateRestaurantInTransaction(
      updateDto,
      transactionalEntityManager,
    );
  }

  private async createOrUpdateRestaurantInTransaction(
    updateDto: UpdateRestaurantDto,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    try {
      // 레스토랑 엔티티의 배타적 잠금을 시도합니다.
      const existingRestaurant = await transactionalEntityManager.findOne(
        Restaurant,
        {
          where: { uniqueId: updateDto.uniqueId },
          lock: { mode: 'pessimistic_write' },
        },
      );

      if (existingRestaurant) {
        // 기존 레스토랑 정보를 업데이트합니다.
        await transactionalEntityManager.save(Restaurant, {
          ...existingRestaurant,
          ...updateDto,
        });
      } else {
        // 새 레스토랑 엔티티를 생성합니다.
        const newRestaurant = transactionalEntityManager.create(
          Restaurant,
          updateDto,
        );
        await transactionalEntityManager.save(Restaurant, newRestaurant);
      }
    } catch (error) {
      // 오류가 발생하면 트랜잭션을 롤백하는 로직은 상위 컨텍스트에 맡깁니다.
      throw new Error(`레스토랑 데이터 트랜잭션 오류: ${error.message}`);
    }
  }

  private delayForNextBatch(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private validateAndFormatTelephone(telephone: string): string | null {
    const startsWith031 = telephone.startsWith('031');
    const startsWith032 = telephone.startsWith('032');
    const startsWith02 = telephone.startsWith('02');
    const startsWith070 = telephone.startsWith('070');
    const startsWith050 = telephone.startsWith('050');

    if (
      startsWith031 ||
      startsWith032 ||
      startsWith02 ||
      startsWith070 ||
      startsWith050
    ) {
      return telephone;
    } else {
      return `031${telephone}`;
    }
  }
}
