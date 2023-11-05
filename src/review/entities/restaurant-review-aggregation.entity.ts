import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class RestaurantReviewAggregation {
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	@Column({ name: 'position', type: 'varchar'})
	content: string;
	
	@Column({type: "decimal", precision: 10, scale: 2, default: 0})
	average_score: number;
	
	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp',
		nullable: false,
	})
	createdAt: Date;

	@UpdateDateColumn({
		name: 'updated_at', 
		type: 'timestamp', 
		nullable: true
	})
	updatedAt?: Date | null;

	@DeleteDateColumn({
		name: 'deleted_at', 
		type: 'timestamp', 
		nullable: true
	})
	deletedAt?: Date | null;

	// @OneToOne(() => Restaurant)
	// @JoinColumn({ name: 'restaurant_id' })
	// restaurant: Restaurant;
}
