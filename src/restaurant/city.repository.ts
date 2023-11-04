import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { City } from './entity/city.entity';
import { EntityManager, Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity'; // 필요에 따라 import 추가
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere'; // 필요에 따라 import 추가

@Injectable()
export class CityRepository {
  constructor(
    @InjectRepository(City)
    private cityRepository: Repository<City>,
  ) {}

  private getRepository(manager?: EntityManager): Repository<City> {
    return manager ? manager.getRepository(City) : this.cityRepository;
  }

  async findOne(condition, manager?: EntityManager): Promise<City | undefined> {
    return this.getRepository(manager).findOne(condition);
  }

  async createOne(
    cityData: { name: string },
    manager?: EntityManager,
  ): Promise<City> {
    const repo = this.getRepository(manager);
    const city = repo.create(cityData);
    await repo.save(city);
    return city;
  }

  async assignCity(
    cityId: number,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (!cityId) return;

    const city = await this.findOrCreate(cityId, manager);
    restaurant.city = city;
  }

  private async findOrCreate(
    id: number,
    manager?: EntityManager,
  ): Promise<City> {
    const repo = this.getRepository(manager);
    let city = await repo.findOne({ where: { id } as FindOptionsWhere<City> });

    if (!city) {
      city = repo.create({ id });
      await repo.save(city);
    }

    return city;
  }
}
