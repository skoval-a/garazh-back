import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthHelper {
  @Inject(JwtService)
  private readonly jwt: JwtService;

  public encodePassword(password: string): string {
    const salt: string = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  public async isPasswordValid(
    password: string,
    encodedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compareSync(password, encodedPassword);
  }

  public generateToken(user: UserEntity): string {
    return this.jwt.sign({ id: user.id, email: user.email });
  }
}
