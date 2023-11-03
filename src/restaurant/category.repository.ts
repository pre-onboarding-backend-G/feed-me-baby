import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findOne(condition): Promise<Category | undefined> {
    return this.categoryRepository.findOne(condition);
  }

  async createOne(categoryData: { name: string }): Promise<Category> {
    const category = this.categoryRepository.create(categoryData);
    await this.categoryRepository.save(category);
    return category;
  }
}
