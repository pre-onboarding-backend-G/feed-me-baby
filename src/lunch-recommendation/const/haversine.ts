import { HAVERSINE } from './lunch-recommendation.const';

// haversine 공식을 이용한 두 좌표간의 거리 계산 함수
export function calculateDistanceBetweenCoordinates(
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
): number {
  const dLat = HAVERSINE.deg2rad(latitude2 - latitude1);
  const dLon = HAVERSINE.deg2rad(longitude2 - longitude1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(HAVERSINE.deg2rad(latitude1)) *
      Math.cos(HAVERSINE.deg2rad(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = HAVERSINE.RADIUS * c;

  return distance;
}
