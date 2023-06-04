import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from "../auth/auth.guard";
// import { JwtAuthGuard } from '../auth/auth.guard';

export type RequestWithUser = Request & { user: UserEntity };

@ApiTags('Users')
@Controller('users')
export class UsersController {
  @Get()
  getUsers() {
    console.log('USERS CONTROLER');
  }


  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  private getProfile(@Req() req: RequestWithUser): UserEntity {
    return req.user;
  }
}
