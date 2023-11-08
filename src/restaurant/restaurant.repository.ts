import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { CategoryRepository } from './category.repository';
import { CityRepository } from './city.repository';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto.ts';

@Injectable()
export class RestaurantRepository {
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
    private categoryRepository: CategoryRepository,
    private cityRepository: CityRepository,
  ) {}

  private getRepository(manager?: EntityManager): Repository<Restaurant> {
    return manager
      ? manager.getRepository(Restaurant)
      : this.restaurantRepository;
  }

  async softDeleteRestaurant(
    uniqueId: string,
    manager?: EntityManager,
  ): Promise<void> {
    const repo = this.getRepository(manager);
    await repo.update({ uniqueId }, { deletedAt: new Date() });
  }

  async findOne(
    conditions,
    manager?: EntityManager,
  ): Promise<Restaurant | undefined> {
    const repo = this.getRepository(manager);
    return repo.findOne(conditions);
  }

  async findByUniqueId(
    uniqueId: string,
    manager?: EntityManager,
  ): Promise<Restaurant | null> {
    const repo = this.getRepository(manager);
    return repo.findOne({ where: { uniqueId } });
  }

  async assignRelations(
    updateDto: UpdateRestaurantDto,
    restaurant: Restaurant,
    transactionalEntityManager: EntityManager,
  ): Promise<void> {
    const city = await this.cityRepository.findOrCreate(
      updateDto.cityName,
      transactionalEntityManager,
    );

    const category = await this.categoryRepository.findOrCreate(
      updateDto.categoryName,
      transactionalEntityManager,
    );

    // 관계 설정: restaurant 인스턴스에 찾거나 생성한 인스턴스를 할당합니다.
    restaurant.city = city;
    restaurant.category = category;

    await transactionalEntityManager.save(restaurant);
  }

  async findOrCreate(
    uniqueId: string,
    updateDto: UpdateRestaurantDto,
    transactionalEntityManager: EntityManager,
    retryCount: number = 3,
  ): Promise<{ entity: Restaurant; wasExisting: boolean }> {
    let restaurant;
    let wasExisting = true;

    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        restaurant = await transactionalEntityManager.findOne(Restaurant, {
          where: { uniqueId },
        });

        if (!restaurant) {
          // 여기에서는 wasExisting을 false로 설정하여 새 엔티티가 생성되었음을 나타냅니다.
          restaurant = transactionalEntityManager.create(Restaurant, updateDto);
          await transactionalEntityManager.save(restaurant);
          wasExisting = false; // 새 엔티티를 생성했으므로 wasExisting을 false로 설정합니다.
          return { entity: restaurant, wasExisting };
        }
        return { entity: restaurant, wasExisting };
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
          restaurant = await transactionalEntityManager.findOne(Restaurant, {
            where: { uniqueId },
          });
          if (restaurant) {
            return { entity: restaurant, wasExisting };
          }
          await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
        } else {
          throw error;
        }
      }
    }
    throw new Error(
      `Failed to find or create the restaurant after ${retryCount} attempts.`,
    );
  }

  async count(manager?: EntityManager): Promise<number> {
    const repo = this.getRepository(manager);
    return repo.count();
  }
}
