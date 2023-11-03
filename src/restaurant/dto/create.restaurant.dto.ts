export class CreateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  telephone?: string;
  categoryId: number;
  cityId: number;
}
