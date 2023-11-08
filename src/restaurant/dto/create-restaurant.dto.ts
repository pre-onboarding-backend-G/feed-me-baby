export class CreateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  lat: string;
  lon: string;
  telephone?: string;
  category: string;
  city: string;
}
