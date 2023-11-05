/**team G webhook URL */
// export const DISCORD_WEBHOOK_URL =
//   'https://discord.com/api/webhooks/1169806570637496341/PQPfdxohAcw25uHUL1w5BdaGUHm-TUcZkLaD9x-JhlTHVKgpiZh-g8-XsepSJa6Dr0vO';

export const DISCORD_WEBHOOK_URL =
  'https://discord.com/api/webhooks/1170568748843946124/9aDOCN1W66q8oRlef-mvlpKOoIBLMbSo2WFycqt22xnY8DjEh1cIlF3q2P3fOTIbV7aI';
export const LUNCH_IMAGE =
  'https://cdn-icons-png.flaticon.com/512/7662/7662446.png';

// 지구 평균 반지름 6371km (미터 단위)
export const EARTH_RADIUS_METERS = 6371000;

// 도(degree)에서 라디안(radian)으로 변환하는 계수
export const DEG_TO_RAD_FACTOR = Math.PI / 180;

// 구 위의 거리를 계산하기 위한 haversine 공식 상수
export const HAVERSINE = {
  // 구의 반지름
  RADIUS: EARTH_RADIUS_METERS,
  // 각도를 라디안으로 변환하는 함수
  deg2rad(deg: number): number {
    return deg * DEG_TO_RAD_FACTOR;
  },
};
