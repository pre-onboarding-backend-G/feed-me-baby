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

  async seedCategories(manager?: EntityManager): Promise<void> {
    const categories = [
      '한식',
      '식육(숯불구이)',
      '김밥(도시락)',
      '호프/통닭',
      '기타',
      '중국식',
      '통닭(치킨)',
      '일식',
      '탕류(보신용)',
      '경양식',
      '분식',
      '회집',
      '정종/대포집/소주방',
      '키즈카페',
      '까페',
      '횟집',
      '뷔페식',
      '냉면집',
      '패스트푸드',
      '외국음식전문점(인도,태국등)',
      '복어취급',
      '패밀리레스트랑',
      '라이브카페',
      '출장조리',
      '감성주점',
      '전통찻집',
      '이동조리',
    ];

    for (const categoryName of categories) {
      let category = await this.categoryRepository.findOne({
        where: { name: categoryName },
      });

      if (!category) {
        category = this.categoryRepository.create({ name: categoryName });
        await this.categoryRepository.save(category);
      }
    }
  }
}
