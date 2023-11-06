import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { RestaurantReviewAggregation } from './entities/restaurant-review-aggregation.entity';
import { ReviewRepository } from './repository/review.repository';
import { RestaurantreviewAggregationRepository } from './repository/restaurant-review-aggregation.repository';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Review, 
      RestaurantReviewAggregation
    ]),
    RestaurantModule
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService, 
    ReviewRepository, 
    RestaurantreviewAggregationRepository
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
