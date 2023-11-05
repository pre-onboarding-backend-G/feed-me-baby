export class CreateRestaurantDto {
  uniqueId: string;
  name: string;
  address: string;
  latitude: string;
  longitude: string;
  telephone?: string;
  category: string;
  city: string;
}
