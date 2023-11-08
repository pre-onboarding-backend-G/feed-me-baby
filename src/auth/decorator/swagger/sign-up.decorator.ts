import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { SignUpDto } from './../../dto/sign-up.dto';

export const SwaggerSignUp = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: '회원가입 API',
      description:
        '회원가입을 위한 API입니다. 응답 상태코드, 메시지, JWT 엑세스 토큰을 반환합니다.',
    }),

    ApiCreatedResponse({
      description:
        '회원가입 성공 시 응답입니다. 201 상태코드와 함께 요청 성공 메시지와 엑세스 토큰이 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.CREATED] },
              message: {
                type: 'string',
                example: '회원가입 요청에 성공했습니다',
              },
              data: {
                properties: { accessToken: { type: 'string' } },
              },
            },
          },
        ],
      },
    }),
    ApiConflictResponse({
      description:
        '회원가입 실패 시 응답입니다. 409 상태코드와 함께 요청 실패 메시지가 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.UNAUTHORIZED] },
              message: {
                type: 'string',
                example: '이미 가입된 회원입니다',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),
    ApiBody({ type: SignUpDto }),
  );
