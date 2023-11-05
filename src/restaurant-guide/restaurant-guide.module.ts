import { Module } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RestaurantGuideController } from './restaurant-guide.controller';
import { RestaurantGuideRepository } from './repository/restaurant-guide.repository';

@Module({
  controllers: [RestaurantGuideController],
  providers: [RestaurantGuideService, RestaurantGuideRepository],
})
export class RestaurantGuideModule {}
