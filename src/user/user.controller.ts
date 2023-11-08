import { ResponseEntity } from './../common/response.entity';
import { UserId } from './../auth/decorator/user-id.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserResDto } from './dto/get-user-res.dto';
import { ApiTags } from '@nestjs/swagger';
import { SwaggerGetUser } from './decorator/swagger/get-user.decorator';
import { SwaggerUpdateUser } from './decorator/swagger/update-user.decorator';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @SwaggerGetUser()
  @UseGuards(AuthGuard)
  @Get()
  async getUser(
    @UserId() userId: number,
  ): Promise<ResponseEntity<GetUserResDto>> {
    const user = await this.userService.getUser(userId);
    return ResponseEntity.OK_WITH('사용자 정보 조회 요청에 성공했습니다', user);
  }

  @SwaggerUpdateUser()
  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @UserId() userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseEntity<string>> {
    await this.userService.updateUser(userId, dto.getProps());
    // todo 204 no content로 상태코드 변경 예정
    return ResponseEntity.OK('사용자 설정 업데이트 요청에 성공했습니다');
  }
}
