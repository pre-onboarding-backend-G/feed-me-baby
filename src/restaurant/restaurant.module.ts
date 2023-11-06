import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from './entity/restaurant.entity';
import { Category } from './entity/category.entity';
import { City } from './entity/city.entity';
import { RestaurantRepository } from './restaurant.repository';
import { CategoryRepository } from './category.repository';
import { CityRepository } from './city.repository';
import { RestaurantService } from './restaurant.service';
import { RestaurantController } from './restaurant.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, City])],
  providers: [
    RestaurantRepository,
    CategoryRepository,
    CityRepository,
    RestaurantService,
  ],
  controllers: [RestaurantController],
  exports: [RestaurantRepository]
})
export class RestaurantModule {}
