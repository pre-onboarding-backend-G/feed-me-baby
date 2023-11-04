import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { EntityManager, Repository } from 'typeorm';
import { Restaurant } from './entity/restaurant.entity';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  private getRepository(manager?: EntityManager): Repository<Category> {
    return manager ? manager.getRepository(Category) : this.categoryRepository;
  }

  async findOne(
    condition,
    manager?: EntityManager,
  ): Promise<Category | undefined> {
    return this.getRepository(manager).findOne(condition);
  }

  async createOne(
    categoryData: { name: string },
    manager?: EntityManager,
  ): Promise<Category> {
    const repo = this.getRepository(manager);
    const category = repo.create(categoryData);
    await repo.save(category);
    return category;
  }

  async assignCategory(
    categoryId: number,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (!categoryId) return;

    const category = await this.findOrCreateCategory(categoryId, manager);
    restaurant.category = category;
  }

  private async findOrCreateCategory(
    id: number,
    manager?: EntityManager,
  ): Promise<Category> {
    const repo = this.getRepository(manager);
    let category = await repo.findOne({ where: { id } });

    if (!category) {
      category = repo.create({ id });
      await repo.save(category);
    }

    return category;
  }
}
