import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  async findOne(condition): Promise<City | undefined> {
    return this.cityRepository.findOne(condition);
  }

  async createOne(cityData: { name: string }): Promise<City> {
    const city = this.cityRepository.create(cityData);
    await this.cityRepository.save(city);
    return city;
  }
}
