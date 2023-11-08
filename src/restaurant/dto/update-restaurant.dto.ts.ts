import { Category } from '../entity/category.entity';
import { City } from '../entity/city.entity';

export class UpdateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  telephone: string | null;
  category: Category;
  city: City;
}
