import { Exclude, Expose } from 'class-transformer';
import { User } from '../entity/user.entity';

export class GetUserResDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _email: string;
  @Exclude() private readonly _password: string;
  @Exclude() private readonly _city: string;
  @Exclude() private readonly _latitude: number;
  @Exclude() private readonly _longitude: number;
  @Exclude() private readonly _isRecommendateLunch: boolean;
  @Exclude() private readonly _createdAt: Date;
  @Exclude() private readonly _updatedAt?: Date | null;
  @Exclude() private readonly _deletedAt?: Date | null;

  constructor(user: User) {
    Object.keys(user).forEach((key) => (this[`_${key}`] = user[key]));
  }

  @Expose()
  get id(): number {
    return this._id;
  }
  @Expose()
  get email(): string {
    return this._email;
  }

  @Expose()
  get city(): string {
    return this._city;
  }
  @Expose()
  get latitude(): number {
    return this._latitude;
  }
  @Expose()
  get longitude(): number {
    return this._longitude;
  }
  @Expose()
  get isRecommendateLunch(): boolean {
    return this._isRecommendateLunch;
  }
  @Expose()
  get createdAt(): Date {
    return this._createdAt;
  }
  @Expose()
  get updatedAt(): Date {
    return this?._updatedAt;
  }
}
