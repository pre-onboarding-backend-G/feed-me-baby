import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { Repository } from 'typeorm';
import { CreateRestaurantDto } from './dto/create.restaurant.dto';

@Injectable()
export class RestaurantRepository {
  categoryRepository: any;
  cityRepository: any;
  constructor(
    @InjectRepository(Restaurant)
    private restaurantRepository: Repository<Restaurant>,
  ) {}

  async createRestaurant(
    createRestaurantDto: CreateRestaurantDto,
  ): Promise<Restaurant> {
    let restaurant = new Restaurant();

    Object.assign(restaurant, createRestaurantDto);

    if (createRestaurantDto.categoryId) {
      const category = await this.categoryRepository.findOne(
        createRestaurantDto.categoryId,
      );
      if (!category) {
        throw new NotFoundException(
          `Category with ID ${createRestaurantDto.categoryId} not found.`,
        );
      }
      restaurant.categoryId = category;
    }

    if (createRestaurantDto.cityId) {
      const city = await this.cityRepository.findOne(
        createRestaurantDto.cityId,
      );
      if (!city) {
        throw new NotFoundException(
          `City with ID ${createRestaurantDto.cityId} not found.`,
        );
      }
      restaurant.cityId = city;
    }

    // 저장 전 'restaurant' 인스턴스가 완전하게 구성되었는지 확인합니다.
    restaurant = this.restaurantRepository.create(restaurant);
    await this.restaurantRepository.save(restaurant);
    return restaurant;
  }

  async softDeleteRestaurant(uniqueId: string): Promise<void> {
    await this.restaurantRepository.update(
      { uniqueId },
      { deletedAt: new Date() },
    );
  }

  async updateRestaurant(
    uniqueId: string,
    updateRestaurantDto,
  ): Promise<Restaurant | null> {
    const existingRestaurant = await this.restaurantRepository.findOne({
      where: { uniqueId, deletedAt: null },
    });
    if (!existingRestaurant) {
      console.log('레스토랑이 존재하지 않거나 삭제되었습니다.');
      return null;
    }

    await this.restaurantRepository.update({ uniqueId }, updateRestaurantDto);
    return this.restaurantRepository.findOne({ where: { uniqueId } });
  }

  async findOne(conditions): Promise<Restaurant | undefined> {
    return this.restaurantRepository.findOne(conditions);
  }
}
