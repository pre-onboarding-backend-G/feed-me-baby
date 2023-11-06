export class UpdateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  telephone: string | null;
  categoryName: string;
  cityName: string;
}
