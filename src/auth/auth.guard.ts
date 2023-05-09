import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard, IAuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements IAuthGuard {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    await super.canActivate(context);

    return !!context.switchToHttp().getRequest().user;
  }
}
