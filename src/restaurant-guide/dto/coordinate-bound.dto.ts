import { Type } from 'class-transformer';
import { IsOptional, IsLatitude, IsLongitude, IsNumber } from 'class-validator';

export class CoordinateBoundDto {
  @IsLatitude()
  @IsOptional()
  @Type(() => Number)
  private readonly _lat?: number;

  @IsLongitude()
  @IsOptional()
  @Type(() => Number)
  private readonly _lon?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  private readonly _range?: number;

  constructor(lat?: number, lon?: number, range?: number) {
    this._lat = lat;
    this._lon = lon;
    this._range = range;
  }

  get minLat(): number {
    return this._lat - this._range;
  }

  get maxLat(): number {
    return this._lat + this._range;
  }

  get minLon(): number {
    return this._lon - this._range;
  }

  get maxLon(): number {
    return this._lon + this._range;
  }
}
