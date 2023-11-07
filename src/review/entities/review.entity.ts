import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RestaurantReviewAggregation } from './restaurant-review-aggregation.entity';
import { User } from 'src/user/entity/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint', unsigned: true })
  id: number;

  @Column({ name: 'content', type: 'varchar', nullable: true, length: 255 })
  content: string;

  @Column({ name: 'score', type: 'smallint', nullable: false })
  score: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date | null;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date | null;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => RestaurantReviewAggregation)
  @JoinColumn({ name: 'restaurant_review_aggregation_id' })
  restaurantReviewAggregationId: number;
}
