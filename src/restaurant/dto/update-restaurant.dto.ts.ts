import { Category } from '../entity/category.entity';
import { City } from '../entity/city.entity';

export class UpdateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  telephone: string | null;
  category: Category;
  city: City;
}
