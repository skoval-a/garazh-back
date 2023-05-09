import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { AuthHelper } from './auth.helper';
import { UserEntity } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  @Inject(AuthHelper)
  private readonly helper: AuthHelper;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  constructor(@Inject(ConfigService) config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_KEY'),
      ignoreExpiration: true,
    });
  }

  private async validate(user: { email: string; password: string }) {
    return await this.usersService.findUserByEmail(user.email);
  }
}
