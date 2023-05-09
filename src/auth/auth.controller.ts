import { Body, Controller, HttpException, Inject, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthenticateDto } from './dto/authenticate.dto';
import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  @Inject(AuthService)
  private readonly service: AuthService;

  @Post('/signup/')
  @ApiOperation({ summary: 'Register user' })
  private register(@Body() body: AuthenticateDto): Promise<HttpException> {
    return this.service.register(body);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  private login(
    @Body() body: AuthenticateDto,
  ): Promise<HttpException> | Promise<{ access_token: string }> {
    return this.service.login(body);
  }
}
