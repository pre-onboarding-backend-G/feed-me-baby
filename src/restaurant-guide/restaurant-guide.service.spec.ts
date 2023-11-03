import { Test, TestingModule } from '@nestjs/testing';
import { RestaurantGuideService } from './restaurant-guide.service';

describe('RestaurantGuideService', () => {
  let service: RestaurantGuideService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RestaurantGuideService],
    }).compile();

    service = module.get<RestaurantGuideService>(RestaurantGuideService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  /**
   * @author Yeon Kyu
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */

  // 대충  메서드 작성

  // 대충  메서드 작성

  /**
   * @author Sang Un
   * @email suntail2002@naver.com
   * @create date 2023-11-01 22:56:10
   * @modify date 2023-11-01 22:56:10
   * @desc [description]
   */

  // 대충  메서드 작성

  // 대충  메서드 작성
});
