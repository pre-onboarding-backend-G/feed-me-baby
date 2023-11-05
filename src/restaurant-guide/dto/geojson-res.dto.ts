import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class GeoJsonResponse<T> {
  @Exclude() private readonly _type: string;
  @Exclude() private readonly _features: T[];

  constructor(features: T[]) {
    this._type = 'FeatureCollection';
    this._features = features;
  }

  @ApiProperty()
  @Expose()
  get type(): string {
    return this._type;
  }

  @ApiProperty()
  @Expose()
  get features(): T[] {
    return this._features;
  }
}
