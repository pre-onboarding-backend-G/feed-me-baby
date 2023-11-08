import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LunchRecommendationService } from '../lunch-recommendation.service';

@Injectable()
export class LunchRecommendationScheduler {
  constructor(private lunchRecommendationService: LunchRecommendationService) {}

  // @Cron('*/10 * * * * *') // test용, 매10초마다 실행
  @Cron('0 30 11 * * 1-5') // 월요일~금요일 오전 11시 30분
  async handleCron(): Promise<void> {
    // 점심 추천 받을 사용자 확인
    const lunchRecommendationUsers =
      await this.lunchRecommendationService.getLunchRecommendationUser();

    // 점심 추천 병렬 처리
    await Promise.all(
      lunchRecommendationUsers.map(async (rawUser) => {
        const lat = Number(rawUser.lat);
        const lon = Number(rawUser.lon);

        // 반경 안에 있는 식당 추출
        const restaurants =
          await this.lunchRecommendationService.findRestaurantsInCircle(
            lat,
            lon,
          );

        // email과 해당 식당을 디스코드 채널에 보내기
        this.lunchRecommendationService.sendMessage(rawUser.email, restaurants);
      }),
    );
  }
}
