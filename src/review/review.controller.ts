import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerCreateReview } from './decorator/swagger/create-review.decorator';

@ApiTags('reviews')
@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  // @UseGuards(AuthGuard)
  @SwaggerCreateReview()
  @Post()
  async create(
    // @UserId() userId: number, //FIXME - 병합 후 사용 가능 확인 후 해제할 것
    @Body() dto: CreateReviewDto,
  )
  // : Promise<ResponseEntity<string> //FIXME - 병합 후 사용 가능 확인 후 해제할 것
  {
    let userId: number = 1; // tmp to implement //FIXME - 병합 후 userId 사용 가능 확인 후 삭제할 것
    await this.reviewService.create(userId, dto.score, dto.content, dto.restaurantId);
    // return RepositoryEntity.OK('리뷰 작성 요청에 성공했습니다') //FIXME - 병합 후 사용 가능 확인 후 해제할 것
    return ;
  }
}
