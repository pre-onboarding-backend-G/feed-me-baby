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

  @ManyToOne((type) => Category, (category) => category.restaurants, {
    nullable: true,
  })
  @JoinColumn({ name: 'categoryId' })
  categoryId: Category;

  @ManyToOne((type) => City, (city) => city.restaurants, { nullable: true })
  @JoinColumn({ name: 'cityId' })
  cityId: City;

  @DeleteDateColumn()
  deletedAt?: Date;
}
