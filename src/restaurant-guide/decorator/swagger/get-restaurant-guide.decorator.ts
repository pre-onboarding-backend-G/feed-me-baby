import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiNotFoundResponse, ApiOperation, ApiResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { GetRestaurantsDto } from '../../../restaurant-guide/dto/get-restaurant.dto';

export const CustomGetRestaurantsGuide = () =>
  applyDecorators(
    ApiOperation({ summary: '주변 맛집 정보들을 가져옵니다' }),

    ApiBearerAuth(),

    ApiHeader({
      name: 'Authorization',
      description: 'Bearer 토큰',
      required: true,
      schema: {
        type: 'bearer',
      },
    }),

    ApiResponse({
      status: 200,
      type: GetRestaurantsDto,
      isArray: true,
      description: 'geojson에 넣을 수 있는 데이터 포맷을 따릅니다',
    }),

    ApiUnauthorizedResponse({
      description:
        '로그인 실패 시 응답입니다. 401 상태코드와 함께 요청 실패 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.UNAUTHORIZED] },
              message: {
                type: 'string',
                example:
                  '로그인 후 이용 바랍니다',
              },
            },
          },
        ],
      },
    }),
    
    ApiNotFoundResponse({
      description:
        '맛집 정보 조회 실패 시 응답입니다. 404 상태코드와 함께 요청 실패 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.NOT_FOUND] },
              message: {
                type: 'string',
                example: '위치 정보가 없거나 주변에 맛집이 없습니다! 안타깝군요!',
              },
            },
          },
        ],
      },
    }),
  );
