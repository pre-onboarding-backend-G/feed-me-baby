import { Module } from '@nestjs/common';
import { LunchRecommendationService } from './lunch-recommendation.service';
import { LunchRecommendationRepository } from './lunch-recommedation.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import { User } from 'src/user/entity/user.entity';
import { LunchRecommendationScheduler } from './scheduler/lunch-recommendation.scheduler';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forFeature([Restaurant, User]),
  ],
  providers: [
    LunchRecommendationService,
    LunchRecommendationRepository,
    LunchRecommendationScheduler,
  ],
})
export class LunchRecommendationModule {}
