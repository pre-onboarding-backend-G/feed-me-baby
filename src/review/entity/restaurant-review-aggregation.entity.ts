import { Restaurant } from 'src/restaurant/entity/restaurant.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@Unique(['restaurantUniqueId'])
export class RestaurantReviewAggregation {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({
    name: 'average_score',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0,
  })
  averageScore: number;

  @Column({ name: 'total_count', type: 'integer' })
  totalCount: number;

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

  @OneToOne(() => Restaurant)
  @JoinColumn({ name: 'restaurant_unique_id' })
  restaurantUniqueId: string;
}
