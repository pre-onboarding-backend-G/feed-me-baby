import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Review } from '../entity/review.entity';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @IsString()
  @MinLength(0)
  @MaxLength(255)
  content: string;

  @IsNotEmpty()
  @IsString()
  restaurantUniqueId: string;

  toEntity(): Review {
    const review: Review = new Review();
    review.score = this.score;
    review.content = this.content;
    return review;
  }
}
