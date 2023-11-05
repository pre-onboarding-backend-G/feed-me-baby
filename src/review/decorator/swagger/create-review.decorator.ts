import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger';

export const SwaggerCreateReview = (): MethodDecorator =>
  applyDecorators(
    ApiBearerAuth('accessToken'),

    ApiOperation({
      summary: '리뷰 작성 API',
      description:
        '리뷰 작성을 위한 API입니다. 응답 상태코드, 메시지를 반환합니다.',
    }),

    ApiOkResponse({
      description:
        '리뷰 작성 성공 시 응답입니다. 201 상태코드와 함께 요청 성공 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.CREATED] },
              message: {
                type: 'string',
                example: '리뷰 작성 요청에 성공했습니다',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),

    ApiNotFoundResponse({
      description:
        '리뷰 작성 실패 시 응답입니다. 404 혹은 409 상태코드와 함께 요청 실패 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.NOT_FOUND] },
              message: {
                type: 'string',
                example: '해당 식당이 존재하지 않습니다',
              },
              data: { type: 'string', example: '' },
            },
          },
          {
            properties: {
              statusCode: { enum: [HttpStatus.CONFLICT] },
              message: {
                type: 'string',
                example: '이미 해당 식당에 대해 작성한 리뷰가 있습니다',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),
  );