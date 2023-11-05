import {
  IsInt,
  IsNotEmpty,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

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
  @IsInt()
  restaurantId: number;

  // toEntity(): Review {
  //   const review = new Review();
  //   review.score = this.score;
  //   review.content = this.content;
  //   //STUB - 컨트롤러에서 restaurantId 넣을 방법 찾아야 함

  //   return review;
  // }
}
