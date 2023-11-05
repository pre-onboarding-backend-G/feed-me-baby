import { Type } from 'class-transformer';
import { IsOptional, IsInt, IsLatitude, IsLongitude } from 'class-validator';

export class RequestCoordinateWithRangeDto {
  @IsLatitude()
  @IsOptional()
  @Type(() => String)
  private readonly _lat?: string;

  @IsLongitude()
  @IsOptional()
  @Type(() => String)
  private readonly _lon?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  private readonly _range?: number;

  constructor(
    lat?: string,
    lon?: string,
    range?: number,
  ) {
    this._lat = lat;
    this._lon = lon;
    this._range = range;
  }

  get lat(): number {
    return parseFloat(this._lat)
  }

  get lon(): number {
    return parseFloat(this._lon)
  }

  get range(): number {
    return this._range === 5 ? this._range : 1
  }
}

