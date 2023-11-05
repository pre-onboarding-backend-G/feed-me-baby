import { SignInDto } from '../../dto/sign-in.dto';
import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

export const SwaggerSignIn = (): MethodDecorator =>
  applyDecorators(
    ApiOperation({
      summary: '로그인 API',
      description:
        '로그인을 위한 API입니다. 응답 상태코드, 메시지, JWT 엑세스 토큰을 반환합니다.',
    }),

    ApiCreatedResponse({
      description:
        '로그인 성공 시 응답입니다. 201 상태코드와 함께 요청 성공 메시지와 엑세스 토큰이 반환됩니다',
      schema: {
        allOf: [
          {
            properties: {
              statusCode: { enum: [HttpStatus.CREATED] },
              message: {
                type: 'string',
                example: '로그인 요청에 성공했습니다',
              },
              data: {
                properties: { accessToken: { type: 'string' } },
              },
            },
          },
        ],
      },
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
                  '로그인에 실패했습니다. 이메일과 비밀번호를 다시 입력해주세요.',
              },
              data: { type: 'string', example: '' },
            },
          },
        ],
      },
    }),

    ApiBody({ type: SignInDto }),
  );
