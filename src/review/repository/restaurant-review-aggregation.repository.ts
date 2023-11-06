import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantReviewAggregation } from '../entities/restaurant-review-aggregation.entity';
import { RestaurantRepository } from 'src/restaurant/restaurant.repository';

@Injectable()
export class RestaurantreviewAggregationRepository {
  constructor(
    @InjectRepository(RestaurantReviewAggregation)
    private readonly restaurantReviewAggregationRepository: Repository<RestaurantReviewAggregation>,
    private readonly restaurantRepository: RestaurantRepository,
  ) {}

  async saveRepository(
    restaurantReviewAggregation: RestaurantReviewAggregation,
  ): Promise<RestaurantReviewAggregation> {
    return await this.restaurantReviewAggregationRepository.save(
      restaurantReviewAggregation,
    );
  }

  async updateRepository(
    restaurantReviewAggregationId: number,
    restaurantReviewAggregation: RestaurantReviewAggregation,
  ): Promise<boolean> {
    const result = await this.restaurantReviewAggregationRepository.update(
      {
        id: restaurantReviewAggregationId,
      },
      restaurantReviewAggregation,
    );
    return result.affected > 0;
  }

  async findByRestaurantUniqueId(
    restaurantUniqueId: string,
  ): Promise<RestaurantReviewAggregation> {
    const restaurant =
      await this.restaurantRepository.findByUniqueId(restaurantUniqueId);
    if (restaurant === null) {
      throw new NotFoundException('해당 식당이 존재하지 않습니다');
    }
    let restaurantReviewAggregation: RestaurantReviewAggregation =
      await this.restaurantReviewAggregationRepository.findOne({
        where: {
          restaurantUniqueId: restaurantUniqueId,
        },
      });
    if (restaurantReviewAggregation === null) {
      restaurantReviewAggregation =
        this.restaurantReviewAggregationRepository.create({
          averageScore: 0,
          totalCount: 0,
          restaurantUniqueId: restaurantUniqueId,
        });
      await this.restaurantReviewAggregationRepository.save(
        restaurantReviewAggregation,
      );
    }
    return restaurantReviewAggregation;
  }
}
