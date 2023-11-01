import { Module } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RestaurantGuideController } from './restaurant-guide.controller';

@Module({
  controllers: [RestaurantGuideController],
  providers: [RestaurantGuideService],
})
export class RestaurantGuideModule { }
