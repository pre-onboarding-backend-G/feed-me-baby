import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './common/env.validation';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantGuideModule } from './restaurant-guide/restaurant-guide.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { Restaurant } from './restaurant/entity/restaurant.entity';
import { Category } from './restaurant/entity/category.entity';
import { User } from './user/entity/user.entity';
import { Review } from './review/entity/review.entity';
import { RestaurantReviewAggregation } from './review/entity/restaurant-review-aggregation.entity';
import { CustomLoggerModule } from './common/logger/custom-logger.module';
import { City } from './restaurant/entity/city.entity';
import { LunchRecommendationModule } from './lunch-recommendation/lunch-recommendation.module';
import { ReviewModule } from './review/review.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validate,
    }),
    CustomLoggerModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS,
      database: process.env.DATABASE_NAME,
      synchronize: process.env.NODE_ENV !== 'production',
      entities: [
        User,
        Restaurant,
        City,
        Category,
        Review,
        RestaurantReviewAggregation,
      ],
      logging: process.env.NODE_ENV !== 'production',
    }),
    RestaurantModule,
    RestaurantGuideModule,
    LunchRecommendationModule,
    ReviewModule,
  ],
})
export class AppModule {}
