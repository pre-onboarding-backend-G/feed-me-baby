import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class RestaurantReviewAggregationEntity {
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	@Column({ name: 'position', type: 'varchar'})
	content: string;
	
	@Column({type: "decimal", precision: 10, scale: 2, default: 0})
	average_score: number;

	// @OneToOne(() => RestaurantEntity)
	// restaurantEntity: RestaurantEntity;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;
}
