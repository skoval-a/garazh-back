import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get, Inject, Post,
  Req,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { ApiBody, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserEntity } from './user.entity';
import { JwtAuthGuard } from "../auth/auth.guard";
import { AuthService } from "../auth/auth.service";
import { UsersService } from "./users.service";
import { isBoolean } from "class-validator";
import { NickNameDto } from "./dto/checkNickname.dto";
// import { JwtAuthGuard } from '../auth/auth.guard';

export type RequestWithUser = Request & { user: UserEntity };

@ApiTags('Users')
@Controller('users')
export class UsersController {

  @Inject(UsersService)
  private readonly userService: UsersService;

  @Get()
  getUsers() {
    console.log('USERS CONTROLER');
  }


  @Get('profile')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  private getProfile(@Req() req: RequestWithUser) {

    return {...req.user, avatar:req.user.avatar || '',  firstName: req.user.firstName || '', lastName: req.user.lastName || '', nickName: req.user.nickName || ''};
  }


  @Post('verifyNicknameAvailability')
  @ApiOkResponse({ description: 'Returns the availability status of the nickname', schema: {
      type: 'object',
      properties: {
        isExisting: {
          type: 'boolean'
        }
      }
    } })
  private verifyNicknameAvailability(@Req() req: RequestWithUser, @Body() body: NickNameDto) {
    return this.userService.verifyNicknameAvailability(body.nickName);
  }
}
