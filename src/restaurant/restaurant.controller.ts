import { Controller, Post } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';

@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('update')
  syncRestaurantData(): string {
    this.restaurantService.syncRestaurantData();
    return '함수 실행 중...';
  }
}
