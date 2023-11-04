import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

class Geometry {
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
  constructor() {}
}

export class GetRestaurantListDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _name: string;
  @Exclude() private readonly _type: string;
  @Exclude() private readonly _properties?: Properties;
  @Exclude() private readonly _geometry: Geometry;

  constructor(id: number, name: string, lat: number, lon: number) {
    this._id = id;
    this._name = name;
    this._properties = new Properties();
    this._type = 'Feature';
    this._geometry = new Geometry(lon, lat);
  }

  @ApiProperty()
  @Expose()
  get id(): number {
    return this._id;
  }

  @ApiProperty()
  @Expose()
  get name(): string {
    return this._name;
  }

  @ApiProperty()
  @Expose()
  get type(): string {
    return this._type;
  }

  @ApiProperty()
  @Expose()
  get properties(): Properties {
    return this._properties;
  }

  @ApiProperty({ type: Geometry })
  @Expose()
  get geometry(): Geometry {
    return this._geometry;
  }
}
