export class UpdateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  lat: number;
  lon: number;
  telephone: string | null;
  categoryName: string;
  cityName: string;
}
