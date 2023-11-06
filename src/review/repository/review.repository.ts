import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';
import { RestaurantReviewAggregation } from '../entities/restaurant-review-aggregation.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  createRepository(
    score: number, 
    content: string, 
    userId: number,
    rra: RestaurantReviewAggregation
  ): Review {
    return this.reviewRepository.create({
      score: score,
      content: content,
      userId: userId,
      restaurantReviewAggregation: rra
    });
  }

  async saveRepository(review: Review): Promise<Review> {
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
  async findReviewsByRestaurantId(restaurantId: number): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: {
        restaurantReviewAggregation: {
          // restaurant: {
          // 	id: restaurantId
          // } //FIXME - Restaurant 엔티티 병합되면 해제할 것
        },
      },
    });
  }

  /**
   * @author 미종
   * @param userId Review의 User에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewsByUserIdAndRestaurantId(
    userId: number, 
    restaurantId: number
  ): Promise<Review> {
    return await this.reviewRepository.findOne({
      where: {
        userId: userId,
        // restaurantReviewAggregation: {
        //   restaurant: {
        //     id: restaurantId
        //   }
        // } //FIXME - Restaurant 엔티티 병합되면 해제할 것
      },
    });
  }

  async updateReview(reviewId: number, review: Review): Promise<boolean> {
    const result = await this.reviewRepository.update({ id: reviewId }, review);
    return result.affected > 0;
  }
}
