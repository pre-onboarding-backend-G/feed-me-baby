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
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    description:
    '리뷰 시 평가 점수 필드입니다. 최소 0점, 최대 5점 까지 가능합니다.',
    required: true,
    example: 5,
  })
  @IsNotEmpty()
  @IsInt()
  @Min(0)
  @Max(5)
  score: number;

  @ApiProperty({
    description:
      '리뷰 시 작성 내용 필드입니다. 최소 0자, 최대 255자 까지 가능합니다.',
    required: true,
    example: '여기 음식 너무 맛있어요. 묵은지 30분 됐는데 리뷰 쓰면서 배고파졌어요.. 오늘 한 번 더 먹겠습니다.',
  })
  @IsString()
  @MinLength(0)
  @MaxLength(255)
  content: string;

  @ApiProperty({
    description: '리뷰 시 해당 식당의 UNIQUE_ID 필드입니다.',
    required: true,
    example: "RESTAURANT-UNIQUE-ID-EXAMPLE"
  })
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
