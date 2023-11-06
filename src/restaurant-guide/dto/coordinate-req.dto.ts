import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsInt, Min, Max } from 'class-validator';
import { IsLatLongInRange } from '../decorator/coordinate-range-validation.decorator';

export class RequestCoordinateWithRangeDto {
  @ApiProperty({
    description: '맛집 추천 받을 장소의 위도입니다',
    required: true,
    example: 37.237,
  })
  @IsLatLongInRange([36, 38])
  @Type(() => Number)
  lat: number;

  @ApiProperty({
    description: '맛집 추천 받을 장소의 경도입니다',
    required: true,
    example: 127.199,
  })
  @IsLatLongInRange([126, 128])
  @Type(() => Number)
  lon: number;

  @ApiProperty({
    description: '찾고싶은 범위 1~3KM 이하의 값을 입력(기본값: 1)',
    required: false,
    example: 1,
  })
  @IsInt()
  @Min(1, { message: '1 이상의 값이 필요합니다' })
  @Max(3, { message: '3 이하의 값이 필요합니다' })
  @IsOptional()
  @Type(() => Number)
  range?: number;

  constructor(range?: number) {
    this.range = range;
  }

  get validateRange(): number {
    return !this.range ? 0.01 : this.range / 100;
  }
}
