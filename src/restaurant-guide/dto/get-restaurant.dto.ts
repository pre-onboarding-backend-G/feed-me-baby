import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Type } from 'class-transformer';

export interface GetRawRestaurants {
  id: number;
  name: string;
  lat: number;
  lon: number;
}

export class Geometry {
  @ApiProperty()
  @Expose()
  type: string;

  @ApiProperty()
  @Expose()
  coordinates: number[];

  constructor(lat: number, lon: number) {
    this.type = 'Point';
    this.coordinates = [lat, lon]; // 위도와 경도를 반대 순서로 coordinate 배열로 설정
  }
}

class Properties {
  @ApiProperty()
  @Expose()
  name: string;

  constructor(name: string) {
    this.name = name;
  }
}

export class GetRestaurantsDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _type: string;
  @Exclude() private readonly _properties?: Properties;
  @Exclude() private readonly _geometry: Geometry;

  constructor(resturant: GetRawRestaurants) {
    this._id = resturant.id;
    this._properties = new Properties(resturant.name);
    this._type = 'Feature';
    this._geometry = new Geometry(resturant.lon, resturant.lat);
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get type(): string {
    return this._type;
  }

  @ApiProperty()
  @Expose()
  @Type(() => Properties)
  get properties(): Properties {
    return this._properties;
  }

  @ApiProperty({ type: Geometry })
  @Expose()
  get geometry(): Geometry {
    return this._geometry;
  }
}
