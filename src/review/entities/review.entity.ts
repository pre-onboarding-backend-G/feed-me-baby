import { Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

export class Review {
	@PrimaryGeneratedColumn({ name: 'id', type: 'bigint' })
	id: number;

	@Column({ name: 'content', type: 'varchar'})
	content: string;

	@Column({ name: 'score', type: 'tinyint'})
	score: number;	

	// @ManyToOne(() => UserEntity)
	// @JoinColumn({ name: 'user_id' })
	// userEntity: UserEntity;

	// @ManyToOne(() => RestaurantEntity)
	// @JoinColumn({ name: 'restaurant_id' })
	// restaurantEntity: RestaurantEntity;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	@DeleteDateColumn()
	deleted_at: Date;
}
