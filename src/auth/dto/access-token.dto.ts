import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AccessTokenDto {
  @Exclude()
  private readonly _accessToken: string;

  constructor(accessToken: string) {
    this._accessToken = accessToken;
  }

  @ApiProperty({
    description:
      '사용자 인증(로그인) 및 회원가입 이후 발행되는 JWT 토큰입니다. 인증이 필요한 자원에 접근 요청 시, request의 Authorization header에 "Bearer " 토큰을 담아 보내야 합니다',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTY5OTAxODcxOSwiZXhwIjoxNjk5MDIwNTE5fQ.P6h830vO9nOvFO6AykpqJ46F0MqvIRZ2840KhboSSUU',
  })
  @Expose()
  get accessToken(): string {
    return this._accessToken;
  }
}
