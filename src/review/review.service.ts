import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './repository/review.repository';
import { RestaurantreviewAggregationRepository } from './repository/restaurant-review-aggregation.repository';
import { RestaurantReviewAggregation } from './entities/restaurant-review-aggregation.entity';
import { Review } from './entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository
    : ReviewRepository,
    private readonly restaurantReviewAggregatioRepository
    : RestaurantreviewAggregationRepository
  ) {}

  private async getRestaurantReviewAggregationByRestaurantId(restaurantId: number) {
    let rra: RestaurantReviewAggregation = await this
      .restaurantReviewAggregatioRepository
      .findByRestaurantId(restaurantId);
    if (rra === null) {
      //FIXME - 개발 중에 아직 Restaurant 엔티티가 존재하지 않아서 주석 처리함, 병합 후에 해제할 것
      // let restaurant = await this.restaurantRepository(restaurantId);
      // if (restaurant === null) {
      //   throw new NotFoundException('해당 식당이 존재하지 않습니다.')
      // }
      // rra = await this.restaurantReviewAggregatioRepository.createRepository({
      //   averageScore: 0,
      //   totalCount: 0,
      //   restaurant: restaurant
      // });
    }
    return rra;
  }

  private async makeReview(
    userId: number, 
    score: number, 
    content: string, 
    restaurantId: number, 
    rra: RestaurantReviewAggregation
  ): Promise<Review> {
    let userReview: Review = await 
      this.reviewRepository
      .findReviewsByUserIdAndRestaurantId(userId, restaurantId);
    if (userReview !== null) {
      throw new ConflictException('이미 해당 식당에 대해 작성한 리뷰가 있습니다.');
    }
    userReview = this.reviewRepository.createRepository(
      score,
      content,
      rra
    );
    userReview = await this.reviewRepository.saveRepository(userReview);
    return userReview;
  }

  private async updateRestaurantReviewAverageScore(
    rra: RestaurantReviewAggregation, 
    userReview: Review
  ): Promise<void> {
    rra.averageScore 
      = (rra.averageScore * rra.totalCount + userReview.score) / (rra.totalCount + 1);
    rra.totalCount = rra.totalCount + 1;
    await this.restaurantReviewAggregatioRepository.updateRepository(rra.id, rra);
    return ;
  }

  async create(userId: number, score: number, content: string, restaurantId: number) {
    const rra: RestaurantReviewAggregation
      = await this.getRestaurantReviewAggregationByRestaurantId(restaurantId);
    const userReview: Review
      = await this.makeReview(userId, score, content, restaurantId, rra);
    await this.updateRestaurantReviewAverageScore(rra, userReview);
    return ;
  }

  async findReviewsByUserId(userId: number): Promise<Review[]> {
    return await this.reviewRepository.findReviewsByUserId(userId);
  }

  async findReviewsByRestaurantId(restaurantId: number): Promise<Review[]> {
    return await this.reviewRepository.findReviewsByRestaurantId(restaurantId);
  }

  async getAverageScoreAndTotalCountByRestaurantId(restaurantId: number)
  : Promise<{ averageScore: number, totalCount: number }> {
    const rra: RestaurantReviewAggregation 
      = await this.getRestaurantReviewAggregationByRestaurantId(
        restaurantId
    );
    return {
      averageScore: rra.averageScore,
      totalCount: rra.totalCount
    }
  }
}
