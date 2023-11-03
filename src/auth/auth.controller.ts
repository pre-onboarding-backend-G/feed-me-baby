import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseEntity } from 'src/common/response.entity';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

export interface AccessTokenDto {
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    const accessToken = await this.authService.signUp(signUpDto.toEntity());

    return ResponseEntity.CREATED_WITH<AccessTokenDto>(
      '회원가입 요청에 성공했습니다.',
      accessToken,
    );
  }

  @Post('sign-in')
  async signIn(
    @Body() signInDto: SignInDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    const accessToken = await this.authService.signIn(signInDto.toEntity());

    return ResponseEntity.CREATED_WITH<AccessTokenDto>(
      '로그인 요청에 성공했습니다.',
      accessToken,
    );
  }
}
