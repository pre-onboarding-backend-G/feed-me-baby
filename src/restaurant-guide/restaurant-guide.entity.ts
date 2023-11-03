/**
 * restaurant 테이블이 아직 없으므로 임시로 생성한 entity
 */

import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurant')
export class RestaurantEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  district: string;
}
