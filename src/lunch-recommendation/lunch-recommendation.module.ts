import { RestaurantGuideModule } from './../restaurant-guide/restaurant-guide.module';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { UserModule } from './../user/user.module';
import { Module } from '@nestjs/common';
import { LunchRecommendationService } from './lunch-recommendation.service';
import { LunchRecommendationRepository } from './lunch-recommedation.repository';
import { LunchRecommendationScheduler } from './scheduler/lunch-recommendation.scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    RestaurantModule,
    UserModule,
    RestaurantGuideModule,
  ],
  providers: [
    LunchRecommendationService,
    LunchRecommendationRepository,
    LunchRecommendationScheduler,
  ],
})
export class LunchRecommendationModule {}
