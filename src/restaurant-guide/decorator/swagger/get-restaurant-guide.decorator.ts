import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { GetRestaurantsDto } from '../../../restaurant-guide/dto/get-restaurant.dto';

export const CustomGetRestaurantsGuide = () =>
  applyDecorators(
    ApiOperation({ summary: '주변 맛집 정보들을 가져옵니다' }),

    ApiResponse({
      status: 200,
      type: GetRestaurantsDto,
      isArray: true,
      description: 'geojson에 넣을 수 있는 데이터 포맷을 따릅니다',
    }),
  );