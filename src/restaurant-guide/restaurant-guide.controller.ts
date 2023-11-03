import { Controller } from '@nestjs/common';
import { RestaurantGuideService } from './restaurant-guide.service';
import { RequestCoordinateWithRangeDto } from './dto/coordinate-req.dto';

@Controller('restaurant-guide')
export class RestaurantGuideController {
  constructor(
    private readonly restaurantGuideService: RestaurantGuideService,
  ) { }
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */

  async getRestaurantListByQuery(request: RequestCoordinateWithRangeDto): Promise<void> {
    await this.restaurantGuideService.getRestaurantList(request)
  }

  /**
   * 
   * 
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
  /**
   * @author Sang Un
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */
  /**
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   *
   */
}
