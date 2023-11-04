import { Body, Controller, Post } from '@nestjs/common';
import { SignUpReqDto } from './dto/sign-up-req.dto';
import { ResponseEntity } from 'src/common/response.entity';
import { AuthService } from './auth.service';
import { SignInReqDto } from './dto/sign-in-req.dto';
import { ApiTags } from '@nestjs/swagger';
import { AccessTokenDto } from './dto/access-token.dto';
import { SwaggerSignIn } from './decorator/swagger/sign-in.decorator';
import { SwaggerSignUp } from './decorator/swagger/sign-up.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SwaggerSignUp()
  @Post('/sign-up')
  async signUp(
    @Body() dto: SignUpReqDto,
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
    @Body() dto: SignInReqDto,
  ): Promise<ResponseEntity<AccessTokenDto>> {
    const accessToken = await this.authService.signIn(dto.toEntity());

    return ResponseEntity.CREATED_WITH<AccessTokenDto>(
      '로그인 요청에 성공했습니다.',
      accessToken,
    );
  }
}
