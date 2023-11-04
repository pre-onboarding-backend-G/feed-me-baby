import { ResponseEntity } from './../common/response.entity';
import { UserId } from './../auth/decorator/user-id.decorator';
import { AuthGuard } from './../auth/auth.guard';
import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUserResDto } from './dto/get-user-res.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getUser(
    @UserId() userId: number,
  ): Promise<ResponseEntity<GetUserResDto>> {
    const user = await this.userService.getUser(userId);
    return ResponseEntity.OK_WITH('사용자 정보 조회 요청에 성공했습니다', user);
  }

  @UseGuards(AuthGuard)
  @Patch()
  async updateUser(
    @UserId() userId: number,
    @Body() dto: UpdateUserDto,
  ): Promise<ResponseEntity<string>> {
    await this.userService.updateUser(userId, dto.toEntity());
    return ResponseEntity.OK('사용자 설정 업데이트 요청에 성공했습니다');
  }
}
