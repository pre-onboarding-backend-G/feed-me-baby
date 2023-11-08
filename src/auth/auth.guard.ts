import { CustomLogger } from './../common/logger/custom.logger';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger: CustomLogger = new CustomLogger(AuthGuard.name);
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(req);

    if (!token) {
      throw new UnauthorizedException('로그인 후 이용이 가능합니다.');
    }

    try {
      const payload = await this.authService.getTokenPayload(token);
      req['user'] = { id: payload.sub };
    } catch (error) {
      this.logger.debug(error.stack, 'authGuard');
      throw new UnauthorizedException('로그인 후 이용 가능합니다.', error);
    }

    return true;
  }

  private extractTokenFromHeader(req: Request): string | undefined {
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
