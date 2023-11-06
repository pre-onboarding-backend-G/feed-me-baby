import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository
    : Repository<Review>,
  ) {}

  async save(review: Review): Promise<Review> {
    const alreadyReview = await this.reviewRepository.findOne({
      where: {
        userId: review.userId,
        restaurantReviewAggregationId: review.restaurantReviewAggregationId
      }
    });
    if (alreadyReview !== null) {
      throw new ConflictException('이미 해당 식당에 대해 작성한 리뷰가 있습니다');
    }
    return await this.reviewRepository.save(review);
  }

  /**
   * @author 미종
   * @param userId Review의 User에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewsByUserId(userId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: {
        userId: userId
      },
    });
  }

  /**
   * @author 미종
   * @param restaurantId RestaurantReviewAggregation의 Restaurant에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewsByRestaurantId(
    restaurantReviewAggregationId: number
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: {
        restaurantReviewAggregationId: restaurantReviewAggregationId
      },
    });
  }

  /**
   * @author 미종
   * @param userId Review의 User에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewByUserIdAndRestaurantId(
    userId: number, 
    restaurantReviewAggregationId: number
  ): Promise<Review> {
    return await this.reviewRepository.findOne({
      where: {
        userId: userId,
        restaurantReviewAggregationId: restaurantReviewAggregationId
      },
    });
  }

  async update(reviewId: number, review: Review): Promise<boolean> {
    const result = await this.reviewRepository.update({ id: reviewId }, review);
    return result.affected > 0;
  }
}
