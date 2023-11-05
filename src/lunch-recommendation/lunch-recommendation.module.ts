import { Module } from '@nestjs/common';
import { LunchRecommendationService } from './lunch-recommendation.service';

@Module({
  providers: [LunchRecommendationService],
})
export class LunchRecommendationModule {}
