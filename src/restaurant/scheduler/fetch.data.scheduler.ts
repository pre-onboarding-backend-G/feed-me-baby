import { Injectable } from '@nestjs/common';
import { RestaurantService } from '../restaurant.service';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FetchDataScheduler {
  constructor(private restaurantService: RestaurantService) {}

  // @Cron('0 0 * * * *') // 매일 자정에 실행
  // handleCron() {
  //   this.restaurantService.updateRestaurants();
  // }
}
