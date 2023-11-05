import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { EntityManager, Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  private getRepository(manager?: EntityManager): Repository<City> {
    return manager ? manager.getRepository(City) : this.cityRepository;
  }

  async findOne(condition, manager?: EntityManager): Promise<City | undefined> {
    return this.getRepository(manager).findOne(condition);
  }

  async createOne(
    cityData: { name: string },
    manager?: EntityManager,
  ): Promise<City> {
    const repo = this.getRepository(manager);
    const city = repo.create(cityData);
    await repo.save(city);
    return city;
  }

  async assignCity(
    cityName: string,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (!cityName || cityName.trim() === '') {
      return;
    }

    const city = await this.findOrCreate(cityName.trim(), manager);
    restaurant.city = city;
  }

  async findOrCreate(
    name: string,
    transactionalEntityManager: EntityManager,
    retryCount: number = 3,
  ): Promise<City> {
    let city;
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        city = await transactionalEntityManager.findOne(City, {
          where: { name },
        });

        if (!city) {
          city = transactionalEntityManager.create(City, { name });
          await transactionalEntityManager.save(city);
          return city;
        }
        return city;
      } catch (error) {
        const isDeadlockError = error.code === '40P01';
        const isTransactionAbortedError = error.code === '25P02';
        const isDuplicateKeyError = error.code === '23505';

        if (isTransactionAbortedError) {
          await transactionalEntityManager.queryRunner?.rollbackTransaction();
        }

        if (
          (isDeadlockError || isTransactionAbortedError) &&
          attempt < retryCount
        ) {
          await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
          if (isTransactionAbortedError) {
            await transactionalEntityManager.queryRunner?.startTransaction();
          }
        } else if (isDuplicateKeyError) {
          city = await transactionalEntityManager.findOne(City, {
            where: { name },
          });
          if (city) {
            return city;
          }
          await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
        } else {
          throw error;
        }
      }
    }
    throw new Error(
      `Failed to find or create the city after ${retryCount} attempts.`,
    );
  }

  async seedCities(): Promise<void> {
    const cities = [
      '고양시',
      '안양시',
      '화성시',
      '평택시',
      '안산시',
      '수원시',
      '파주시',
      '이천시',
      '포천시',
      '광주시',
      '성남시',
      '안성시',
      '용인시',
      '남양주시',
      '김포시',
      '구리시',
      '과천시',
      '시흥시',
      '동두천시',
      '의정부시',
      '군포시',
      '오산시',
      '부천시',
      '연천군',
      '양주시',
      '하남시',
      '의왕시',
      '여주시',
      '광명시',
      '가평군',
      '양평군',
    ];

    for (const cityName of cities) {
      let city = await this.cityRepository.findOne({
        where: { name: cityName },
      });

      if (!city) {
        city = this.cityRepository.create({ name: cityName });
        await this.cityRepository.save(city);
      }
    }
  }
}
