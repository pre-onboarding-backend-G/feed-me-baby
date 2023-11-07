import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
@Unique(['email'])
export class User {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int', unsigned: true })
  id: number;

  @Column({ name: 'email', type: 'varchar', nullable: false, length: 60 })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 60 })
  password: string;

  @Column({ name: 'city', type: 'varchar', nullable: false, length: 45 })
  city: string;

  @Column({
    name: 'latitude',
    type: 'decimal',
    precision: 12,
    scale: 3,
    nullable: false,
  })
  latitude: number;

  @Column({
    name: 'longitude',
    type: 'decimal',
    precision: 12,
    scale: 3,
    nullable: false,
  })
  longitude: number;

  @Column({
    name: 'is_recommendate_lunch',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  isRecommendateLunch: boolean;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt?: Date | null;

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date | null;

  static byId(id: number): User {
    const user = new User();
    user.id = id;
    return user;
  }

  setHashedPassword(hashedPassword: string): void {
    this.password = hashedPassword;
  }
}
