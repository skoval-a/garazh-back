import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { UserEntity } from "../users/user.entity";
import { UsersService } from "../users/users.service";

import { AuthHelper } from "./auth.helper";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SignUpDto } from "./dto/signup.dto";

@Injectable()
export class AuthService {
  @Inject(AuthHelper)
  private readonly authHelper: AuthHelper;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  @InjectRepository(UserEntity)
  private readonly repository: Repository<UserEntity>;



  async login(body: AuthenticateDto): Promise<{ access_token: string }> {
    const { email, password }: AuthenticateDto = body;

    const user: UserEntity = await this.usersService.findUserByEmail(email);


    if (!user) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }


    const isPasswordValid = await this.authHelper.isPasswordValid(
      password,
      user.password
    );


    if (!isPasswordValid) {
      throw new HttpException("No user found", HttpStatus.NOT_FOUND);
    }

    return { access_token: this.authHelper.generateToken(user) };
  }

  async register(body: SignUpDto): Promise<HttpException> {
    const { email, password, firstName, lastName, nickName }: SignUpDto = body;
    let user: UserEntity = await this.usersService.findUserByEmail(email);

    if (user) {
      throw new HttpException(
        "Такий користувач вже існує",
        HttpStatus.BAD_REQUEST
      );
    }

    const decodedPassword = await this.authHelper.encodePassword(password);


    user = new UserEntity();

    user.email = email;
    user.firstName = firstName;
    user.lastName = lastName;
    user.nickName = nickName;
    user.password = decodedPassword

    await this.repository.save(user);


    return new HttpException("Success", HttpStatus.OK);
  }
}
