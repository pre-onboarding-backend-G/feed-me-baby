import { Injectable } from '@nestjs/common';
import { Webhook, MessageBuilder } from 'discord-webhook-node';
import {
  DISCORD_WEBHOOK_URL,
  LUNCH_IMAGE,
} from './const/lunch-recommendation.const';
import { LunchRecommendationRepository } from './lunch-recommedation.repository';
import { Restaurant } from 'src/restaurant/entity/restaurant.entity';

interface RawUser {
  email: string;
  lat: string;
  lon: string;
}

@Injectable()
export class LunchRecommendationService {
  constructor(
    private readonly lunchRecommendationRepository: LunchRecommendationRepository,
  ) {}

  sendMessage(email: string, restaurants: Restaurant[]): void {
    const hook = new Webhook(DISCORD_WEBHOOK_URL);

    const restaurantListString = restaurants
      .map((restaurant) => `${restaurant.name} - ${restaurant.address}`)
      .join('\n');

    const embed = new MessageBuilder()
      .setTitle(`현재 ${email}님 주변에 있는 식당 리스트`)
      .setAuthor(email, LUNCH_IMAGE)
      .setThumbnail(LUNCH_IMAGE)
      .setDescription(restaurantListString)
      .setTimestamp();

    // 웹훅으로 메시지를 비동기적으로 전송
    hook
      .send(embed)
      .then(() => {
        console.log('Webhook sent successfully.');
      })
      .catch((error) => {
        console.error('Error sending webhook:', error);
      });

    return;
  }

  getLunchRecommendationUser(): Promise<RawUser[]> {
    return this.lunchRecommendationRepository.getLunchRecommendationUser();
  }

  findRestaurantsInCircle(lat: number, lon: number): Promise<Restaurant[]> {
    return this.lunchRecommendationRepository.findRestaurantsInCircle(lat, lon);
  }
}
