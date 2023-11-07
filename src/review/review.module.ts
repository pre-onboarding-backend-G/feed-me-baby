import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { RestaurantReviewAggregation } from './entities/restaurant-review-aggregation.entity';
import { ReviewRepository } from './repository/review.repository';
import { RestaurantReviewAggregationRepository } from './repository/restaurant-review-aggregation.repository';
import { RestaurantModule } from 'src/restaurant/restaurant.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Review, RestaurantReviewAggregation]),
    RestaurantModule,
    UserModule,
  ],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    ReviewRepository,
    RestaurantReviewAggregationRepository,
  ],
  exports: [ReviewService],
})
export class ReviewModule {}
