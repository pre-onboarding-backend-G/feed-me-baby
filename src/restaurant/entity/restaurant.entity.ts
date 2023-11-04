import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { City } from './city.entity';

@Entity('restaurant')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  uniqueId: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column({ nullable: true })
  telephone?: string;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Category, (category) => category.restaurants, {
    nullable: true,
  })
  @JoinColumn({ name: 'category' })
  category: Category;

  @ManyToOne(() => City, (city) => city.restaurants, { nullable: true })
  @JoinColumn({ name: 'city' })
  city: City;
}
