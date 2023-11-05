import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const SwaggerUpdateUser = (): MethodDecorator =>
  applyDecorators(
    ApiBearerAuth('accessToken'),

    ApiOperation({
      summary: '유저 정보 수정 API',
      description:
        '유저 정보 수정을 위한 API입니다. 맛집 추천을 받지에 대한 유무와, 위도, 경도 정보를 수정합니다.',
    }),

    ApiOkResponse({
      description:
        '유저 정보 수정 성공 시 응답입니다. 200 상태코드와 함께 요청 성공 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.OK] },
              message: {
                type: 'string',
                example: '사용자 설정 업데이트 요청에 성공했습니다',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),

    ApiNotFoundResponse({
      description:
        '유저 정보 수정 실패 시 응답입니다. 404 상태코드와 함께 요청 실패 메시지가 반환됩니다',
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
