import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsNumber, IsLongitude, IsLatitude, Max, Min } from 'class-validator';

export class RequestCoordinateWithRangeDto {
  @ApiProperty({
    description: '맛집 추천 받을 장소의 위도입니다',
    required: false,
    example: 37.566295,
  })
  @IsLatitude({ message: '위도 값이 필요합니다' })
  @Type(() => Number)
  lat: number;


  @ApiProperty({
    description: '맛집 추천 받을 장소의 경도입니다',
    required: false,
    example: 126.977945,
  })
  @IsLongitude({ message: '경도 값이 필요합니다' })
  @Type(() => Number)
  lon: number;

  @ApiProperty({
    description: '찾고싶은 범위 0.1(약 11km) 이하의 값을 입력(기본 값: 0.1)',
    required: false,
    example: 0.1,
  })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)  
  range?: number;

  constructor(range?: number) {
    this.range = range;
  }

  get validateRange(): number {
    return !this.range || this.range >= 0.1 ? 0.1 : this.range;
  }
}
