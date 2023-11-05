import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const SwaggerGetUser = (): MethodDecorator =>
  applyDecorators(
    ApiBearerAuth('accessToken'),

    ApiOperation({
      summary: '유저 정보 조회 API',
      description:
        '유저 정보 조회를 위한 API입니다. 응답 상태코드, 메시지, 유저 정보 객체를 반환합니다.',
    }),

    ApiOkResponse({
      description:
        '유저 정보 조회 성공 시 응답입니다. 200 상태코드와 함께 요청 성공 메시지와 유저 정보가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.OK] },
              message: {
                type: 'string',
                example: '사용자 정보 조회 요청에 성공했습니다',
              },
              data: {
                properties: {
                  id: { type: 'number', example: 1 },
                  email: {
                    type: 'string',
                    example: 'feed-me-admin1@naver.com',
                  },
                  city: { type: 'string', example: '서울특별시' },
                  latitude: { type: 'number', example: 37.566295 },
                  longitude: { type: 'number', example: 126.977945 },
                  isRecommendateLunch: { type: 'boolean', example: true },
                  createdAt: {
                    type: 'date',
                    example: '2023-11-04T16:33:50.472Z',
                  },
                  updatedAt: {
                    type: 'date',
                    example: '2023-11-04T16:33:50.472Z',
                  },
                },
              },
            },
          },
        ],
      },
    }),

    ApiNotFoundResponse({
      description:
        '유저 정보 조회 실패 시 응답입니다. 404 상태코드와 함께 요청 실패 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.NOT_FOUND] },
              message: {
                type: 'string',
                example: '유저가 존재하지 않습니다',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),
  );
