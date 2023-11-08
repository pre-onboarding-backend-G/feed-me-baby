import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { ResponseEntity } from 'src/common/response.entity';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenDto } from './dto/access-token.dto';
import { SwaggerSignIn } from './decorator/swagger/sign-in.decorator';
import { SwaggerSignUp } from './decorator/swagger/sign-up.decorator';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SwaggerSignUp()
  @Post('/sign-up')
  async signUp(
    @Body() dto: SignUpDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    const accessToken = await this.authService.signUp(dto.toEntity());

    return ResponseEntity.CREATED_WITH<AccessTokenDto>(
      '회원가입 요청에 성공했습니다.',
      accessToken,
    );
  }

  @SwaggerSignIn()
  @Post('sign-in')
  async signIn(
    @Body() dto: SignInDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    const accessToken = await this.authService.signIn(dto.toEntity());

    return ResponseEntity.CREATED_WITH<AccessTokenDto>(
      '로그인 요청에 성공했습니다.',
      accessToken,
    );
  }
}
