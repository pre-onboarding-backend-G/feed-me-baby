import { CityRepository } from './city.repository';
import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';
import { CategoryRepository } from './category.repository';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(
    private readonly restaurantService: RestaurantService,
    private cityRepository: CityRepository,
    private categoryRepository: CategoryRepository,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {}

  @Post('update')
  syncRestaurantData(): string {
    this.restaurantService.syncRestaurantData();
    return '함수 실행 중...';
  }

  @Post('cities')
  async seedCities(): Promise<void> {
    await this.cityRepository.seedCities();
  }

  @Post('categories')
  async seedCategories(): Promise<void> {
    await this.categoryRepository.seedCategories();
  }
}
