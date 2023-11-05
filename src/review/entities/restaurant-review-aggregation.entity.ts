import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
// @Unique('restaurant') //FIXME - Restaurant 엔티티 병합되면 해제할 것
export class RestaurantReviewAggregation {
  @PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
  id: number;

  @Column({
    name: 'average_score',
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0
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

  //FIXME - Restaurant 엔티티 병합되면 해제할 것
  // @OneToOne(() => Restaurant)
  // @JoinColumn({ name: 'restaurant_id' })
  // restaurant: Restaurant;
}
