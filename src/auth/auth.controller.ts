import { Body, Controller, HttpException, Inject, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthenticateDto } from "./dto/authenticate.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post("/login/")
  @ApiOperation({ summary: "Login user" })
  login(@Body() body: AuthenticateDto) {
    console.log("TEST LOGIN", body);
    return this.service.login(body);
  }

  @Post("/signup/")
  @ApiOperation({ summary: "Register user" })
  async register(@Body() body: AuthenticateDto) {


    await new Promise((resolve) => setTimeout(resolve, 1000));

    return this.service.register(body);
  }
}
