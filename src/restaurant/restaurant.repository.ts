import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager, DeepPartial } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { CategoryRepository } from './category.repository';
import { CityRepository } from './city.repository';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';

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
  private async saveRestaurant(
    restaurant: Restaurant,
    dto: CreateRestaurantDto,
    manager?: EntityManager,
  ): Promise<Restaurant> {
    await this.assignRelations(dto, restaurant, manager);
    const repo = this.getRepository(manager);
    await repo.save(restaurant);
    return restaurant;
  }

  async createOrUpdateRestaurant(
    dto: CreateRestaurantDto,
    manager?: EntityManager,
  ): Promise<Restaurant> {
    const repo = this.getRepository(manager);
    const lat = parseFloat(dto.lat);
    const lon = parseFloat(dto.lon);
    const entityDto = { ...dto, lat, lon };
    const uniqueId = dto.uniqueId;

    let restaurant;
    if (uniqueId) {
      restaurant = await repo.findOne({ where: { uniqueId } });
    }
    if (!restaurant) {
      restaurant = repo.create(entityDto as DeepPartial<Restaurant>);
    } else {
      restaurant = repo.merge(restaurant, entityDto as DeepPartial<Restaurant>);
    }

    return this.saveRestaurant(restaurant, dto, manager);
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

  private async assignRelations(
    dto: CreateRestaurantDto,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (dto.category) {
      await this.categoryRepository.assignCategory(
        dto.category,
        restaurant,
        manager,
      );
    }

    if (dto.city) {
      await this.cityRepository.assignCity(dto.city, restaurant, manager);
    }
  }
}
