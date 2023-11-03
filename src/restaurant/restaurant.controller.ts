import { Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post('update')
  @ApiOperation({ summary: 'Update restaurants' })
  updateRestaurants() {
    return this.restaurantService.updateRestaurants();
  }
}
