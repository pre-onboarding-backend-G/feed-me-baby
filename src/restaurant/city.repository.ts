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
}
