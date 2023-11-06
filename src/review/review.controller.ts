import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateReview } from './decorator/swagger/create-review.decorator';
import { UserId } from 'src/auth/decorator/user-id.decorator';
import { ResponseEntity } from 'src/common/response.entity';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @UseGuards(AuthGuard)
  @SwaggerCreateReview()
  @Post()
  async create(
    @UserId() userId: number,
    @Body() dto: CreateReviewDto,
  ): Promise<ResponseEntity<string>> {
    await this.reviewService.create(userId, dto.toEntity(), dto.restaurantUniqueId);
    return ResponseEntity.OK('리뷰 작성 요청에 성공했습니다');
  }
}
