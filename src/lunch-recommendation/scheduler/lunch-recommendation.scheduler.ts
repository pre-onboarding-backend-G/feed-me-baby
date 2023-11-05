import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LunchRecommendationService } from '../lunch-recommendation.service';

@Injectable()
export class lunchRecommendationScheduler {
  constructor(private lunchRecommendationService: LunchRecommendationService) {}

  // @Cron('0 30 11 * * 1-5')
  @Cron('* * * * * *')
  handleCron(): string {
    return this.lunchRecommendationService.sendMessage();
  }
}
