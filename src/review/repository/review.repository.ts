import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from '../entity/review.entity';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,
  ) {}

  async save(review: Review): Promise<Review> {
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
        userId
      }
    });
  }

  /**
   * @author 미종
   * @param restaurantId RestaurantReviewAggregation의 Restaurant에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewsByRestaurantReviewAggregationId(
    restaurantReviewAggregationId: number,
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: {
        restaurantReviewAggregationId
      }
    });
  }

  /**
   * @author 미종
   * @param userId Review의 User에 대한 FK 입니다.
   * @returns Review 엔티티 배열을 Promise로 반환합니다. review가 없을 경우 빈 배열을 반환합니다.
   */
  async findReviewByUserIdAndRestaurantUniqueId(
    userId: number,
    restaurantReviewAggregationId: number,
  ): Promise<Review[]> {
    return await this.reviewRepository.find({
      where: {
        userId,
        restaurantReviewAggregationId,
      },
    });
  }

  async update(id: number, review: Review): Promise<boolean> {
    const result = await this.reviewRepository
      .update({ id }, review);
    return result.affected > 0;
  }
}
