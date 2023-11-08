import { Module } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RestaurantGuideController } from './restaurant-guide.controller';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { Category } from 'src/restaurant/entity/category.entity';
import { City } from 'src/restaurant/entity/city.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant, Category, City]), UserModule],
  controllers: [RestaurantGuideController],
  providers: [RestaurantGuideService, RestaurantGuideRepository],
  exports: [RestaurantGuideRepository],
})
export class RestaurantGuideModule {}
