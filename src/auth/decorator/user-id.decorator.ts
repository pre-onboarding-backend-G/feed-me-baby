import { ExecutionContext, createParamDecorator } from '@nestjs/common';

/**
 * @desc AuthGuard에서 request context에 주입한 user id를 꺼내는 코드를 분리(AOP)한 데코레이터입니다.
 * @author 명석
 */
export const UserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest()['user']['id'];
  },
);
