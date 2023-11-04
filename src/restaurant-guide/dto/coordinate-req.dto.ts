import { Type } from 'class-transformer';
import { IsOptional, IsNumber } from 'class-validator';

export class RequestCoordinateWithRangeDto {
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lat?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  lon?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  range?: number;

  constructor(lat: number, lon: number, range?: number) {
    this.lat = lat;
    this.lon = lon;
    this.range = range;
  }

  get validateRange(): number {
    return this.range >= 0.1 ? 0.1 : this.range;
  }
}
