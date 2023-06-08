import { Body, Controller, HttpException, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { AuthService } from "./auth.service";
import { SignUpDto } from "./dto/signup.dto";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post("/login/")
  @ApiOperation({ summary: "Login user" })
  login(@Body() body: AuthenticateDto) {
    return this.service.login(body);
  }

  @Post("/signup/")
  @ApiOperation({ summary: "Register user" })
  async register(@Body() body: SignUpDto) {

    return this.service.register(body);
  }

}
