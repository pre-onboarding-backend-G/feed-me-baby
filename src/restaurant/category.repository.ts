import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { EntityManager, QueryRunner, Repository } from 'typeorm';
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
    categoryName: string,
    restaurant: Restaurant,
    manager?: EntityManager,
  ): Promise<void> {
    if (!categoryName) return;

    const category = await this.findOrCreate(categoryName, manager);
    restaurant.category = category;
  }

  async findOrCreate(
    name: string,
    transactionalEntityManager: EntityManager,
    retryCount: number = 3,
  ): Promise<Category> {
    let category;
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        category = await transactionalEntityManager.findOne(Category, {
          where: { name },
        });

        if (!category) {
          category = transactionalEntityManager.create(Category, { name });
          await transactionalEntityManager.save(category);
          return category;
        }
        return category;
      } catch (error) {
        const isDeadlockError = error.code === '40P01';
        const isTransactionAbortedError = error.code === '25P02';
        const isDuplicateKeyError = error.code === '23505';

        if (isTransactionAbortedError) {
          await transactionalEntityManager.queryRunner?.rollbackTransaction();
        }

        if (
          (isDeadlockError || isTransactionAbortedError) &&
          attempt < retryCount
        ) {
          await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
          if (isTransactionAbortedError) {
            await transactionalEntityManager.queryRunner?.startTransaction();
          }
        } else if (isDuplicateKeyError) {
          category = await transactionalEntityManager.findOne(Category, {
            where: { name },
          });
          if (category) {
            return category;
          }
          await new Promise((resolve) => setTimeout(resolve, 50 * attempt));
        } else {
          throw error;
        }
      }
    }
    throw new Error(
      `Failed to find or create the category after ${retryCount} attempts.`,
    );
  }
}
