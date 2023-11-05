import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RestaurantReviewAggregation } from '../entities/restaurant-review-aggregation.entity';

@Injectable()
export class RestaurantreviewAggregationRepository {
  constructor(
    @InjectRepository(RestaurantReviewAggregation)
    private readonly restaurantReviewAggregationRepository
	: Repository<RestaurantReviewAggregation>,
  ) {}

  async saveRepository(
	  restaurantReviewAggregation: RestaurantReviewAggregation
  ): Promise<RestaurantReviewAggregation> {
    return await this.restaurantReviewAggregationRepository
		  .save(restaurantReviewAggregation);
  }

  async updateRepository(
    restaurantReviewAggregationId: number, 
    restaurantReviewAggregation: RestaurantReviewAggregation
  ): Promise<boolean> {
    const result = await this.restaurantReviewAggregationRepository
      .update({
        id: restaurantReviewAggregationId
      },
      restaurantReviewAggregation
    );
    return result.affected > 0;
  }

  async findByRestaurantId(
    restaurantId: number
  ): Promise<RestaurantReviewAggregation> {
	return await this.restaurantReviewAggregationRepository
    .findOne({
      where: {
        // restaurant: {
        // 	id: restaurantId
        // } //FIXME - Restaurant 엔티티 병합되면 해제할 것
      }
    })
  }
}
