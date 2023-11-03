import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseEntity } from 'src/common/response.entity';
import { AuthService } from './auth.service';

export interface SignUpResponseDto {
  accessToken: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(
    @Body() signUpDto: SignUpDto,
  ): Promise<ResponseEntity<SignUpResponseDto>> {
    const accessToken = await this.authService.signUp(signUpDto.toEntity());

    return ResponseEntity.CREATED_WITH<SignUpResponseDto>(
      '회원가입 요청에 성공했습니다.',
      accessToken,
    );
  }
}
