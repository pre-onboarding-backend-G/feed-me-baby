export class CoordinateBoundDto {
  private readonly lat?: number;
  private readonly lon?: number;
  private readonly range?: number;

  constructor(lat?: number, lon?: number, range?: number) {
    this.lat = lat;
    this.lon = lon;
    this.range = range;
  }

  get minLat(): number {
    return this.lat - this.range;
  }

  get maxLat(): number {
    return this.lat + this.range;
  }

  get minLon(): number {
    return this.lon - this.range;
  }

  get maxLon(): number {
    return this.lon + this.range;
  }
}
