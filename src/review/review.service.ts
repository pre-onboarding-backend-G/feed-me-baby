import { Injectable } from '@nestjs/common';
import { ReviewRepository } from './repository/review.repository';
import { RestaurantreviewAggregationRepository } from './repository/restaurant-review-aggregation.repository';
import { RestaurantReviewAggregation } from './entities/restaurant-review-aggregation.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository
    : ReviewRepository,
    private readonly restaurantReviewAggregationRepository
    : RestaurantreviewAggregationRepository,
  ) {}

  private async getRestaurantReviewAggregationByRestaurantUniqueId(
    restaurantUniqueId: string
  ): Promise<RestaurantReviewAggregation> {
    const restaurantReviewAggregation: RestaurantReviewAggregation
      = await this.restaurantReviewAggregationRepository
      .findByRestaurantUniqueId(restaurantUniqueId);
    return restaurantReviewAggregation;
  }

  private async updateRestaurantReviewAverageScoreAndTotalCount(
    restaurantReviewAggregation: RestaurantReviewAggregation, 
    userReview: Review
  ): Promise<void> {
    const prevAverageScore: number = restaurantReviewAggregation.averageScore;
    const prevTotalCount: number = restaurantReviewAggregation.totalCount;
    restaurantReviewAggregation.averageScore 
      = ((prevAverageScore * prevTotalCount) + userReview.score)
        / (prevTotalCount + 1);
    restaurantReviewAggregation.totalCount = prevTotalCount + 1;
    await this.restaurantReviewAggregationRepository
      .updateRepository(
        restaurantReviewAggregation.id, 
        restaurantReviewAggregation
    );
  }

  async create(
    userId: number, review: Review, restaurantUniqueId: string
  ): Promise<void> {
    review.userId = userId;
    const restaurantReviewAggregation: RestaurantReviewAggregation
      = await this
      .getRestaurantReviewAggregationByRestaurantUniqueId(
        restaurantUniqueId
    );
    review.restaurantReviewAggregationId = restaurantReviewAggregation.id;
    await this.reviewRepository.save(review);
    await this.updateRestaurantReviewAverageScoreAndTotalCount(
      restaurantReviewAggregation,
      review
    );
  }

  async findReviewsByUserId(userId: number): Promise<Review[]> {
    return await this.reviewRepository.findReviewsByUserId(userId);
  }

  async findReviewsByRestaurantUniqueId(
    restaurantUniqueId: string
  ): Promise<Review[]> {
    const restaurantReviewAggregation: RestaurantReviewAggregation 
      = await this.getRestaurantReviewAggregationByRestaurantUniqueId(
        restaurantUniqueId
    );
    return await this.reviewRepository
      .findReviewsByRestaurantReviewAggregationId(
        restaurantReviewAggregation.id
    );
  }

  async findReviewByUserIdAndRestaurantUniqueId(
    userId: number,
    restaurantUniqueId: string
  ): Promise<Review[]> {
    const restaurantReviewAggregation: RestaurantReviewAggregation 
      = await this.getRestaurantReviewAggregationByRestaurantUniqueId(
        restaurantUniqueId
    );
    return await this.reviewRepository
      .findReviewByUserIdAndRestaurantUniqueId(
        userId,
        restaurantReviewAggregation.id
    );
  }

  async getAverageScoreAndTotalCountByRestaurantId(
    restaurantUniqueId: string
  ): Promise<{ averageScore: number, totalCount: number }> {
    const restaurantReviewAggregation: RestaurantReviewAggregation
      = await this.getRestaurantReviewAggregationByRestaurantUniqueId(
        restaurantUniqueId
    );
    return {
      averageScore: restaurantReviewAggregation.averageScore,
      totalCount: restaurantReviewAggregation.totalCount
    };
  }
}
