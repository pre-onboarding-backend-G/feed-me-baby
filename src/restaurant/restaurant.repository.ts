import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { CreateRestaurantDto } from './dto/create.restaurant.dto';
import { CategoryRepository } from './category.repository';
import { CityRepository } from './city.repository';

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

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
    manager?: EntityManager,
  ): Promise<Restaurant> {
    const repo = this.getRepository(manager);
    let restaurant = repo.create(createRestaurantDto);
    await this.assignRelations(createRestaurantDto, restaurant, manager);

    await repo.save(restaurant);
    return restaurant;
  }

  async updateRestaurant(
    uniqueId: string,
    updateRestaurantDto,
    manager?: EntityManager,
  ): Promise<Restaurant> {
    const repo = this.getRepository(manager);
    let restaurant = await repo.findOne({
      where: { uniqueId, deletedAt: null },
    });

    if (!restaurant) {
      throw new NotFoundException('Restaurant not found or has been deleted.');
    }

    Object.assign(restaurant, updateRestaurantDto);

    await this.assignRelations(updateRestaurantDto, restaurant, manager);

    await repo.save(restaurant);
    return restaurant;
  }

  private async assignRelations(
    dto: CreateRestaurantDto,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (dto.categoryId) {
      await this.categoryRepository.assignCategory(
        dto.categoryId,
        restaurant,
        manager,
      );
    }

    if (dto.cityId) {
      await this.cityRepository.assignCity(dto.cityId, restaurant, manager);
    }
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

  async createOrUpdateRestaurant(
    createOrUpdateDto: CreateRestaurantDto,
    uniqueId: string,
    manager?: EntityManager,
  ): Promise<Restaurant> {
    const repo = this.getRepository(manager);
    let restaurant = await repo.findOne({ where: { uniqueId } });

    if (restaurant) {
      Object.assign(restaurant, createOrUpdateDto);
      await this.assignRelations(createOrUpdateDto, restaurant, manager);
      await repo.save(restaurant);
    } else {
      restaurant = repo.create(createOrUpdateDto);
      await this.assignRelations(createOrUpdateDto, restaurant, manager);
      await repo.save(restaurant);
    }

    return restaurant;
  }
}
