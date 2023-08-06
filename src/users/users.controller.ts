import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Inject,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiOkResponse,
  ApiTags,
} from "@nestjs/swagger";
import { UserEntity } from "./user.entity";
import { JwtAuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";
import { NickNameDto } from "./dto/checkNickname.dto";
import { updateProfileDto } from "./dto/updateUser.dto";
import { S3Service } from "../services/s3.service";

export type RequestWithUser = Request & { user: UserEntity };

@ApiTags("Users")
@Controller("users")
export class UsersController {
  @Inject(UsersService)
  private readonly userService: UsersService;
  @Inject(S3Service)
  private readonly s3Service: S3Service;

  @Get()
  getUsers() {
    console.log("USERS CONTROLER");
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  @ApiOkResponse({ type: UserEntity })
  private getProfile(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Post("verifyNicknameAvailability")
  @ApiOkResponse({
    description: "Returns the availability status of the nickname",
    schema: {
      type: "object",
      properties: {
        isExisting: {
          type: "boolean",
        },
      },
    },
  })
  private verifyNicknameAvailability(
    @Req() req: RequestWithUser,
    @Body() body: NickNameDto
  ) {
    return this.userService.verifyNicknameAvailability(body.nickName);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Put("profile")
  @UseGuards(JwtAuthGuard)
  private async updateProfile(
    @Req() req: RequestWithUser,
    @Body() body: updateProfileDto
  ) {
    const uploadAvatar = async (base64: string) => {
      const bucketName = "garazh";
      const fileName = `avatars/image_${Date.now()}`;

      try {
        const imageUrl = await this.s3Service.uploadImage(
          base64,
          bucketName,
          fileName
        );
        return { imageUrl };
      } catch (error) {
        throw new Error(`Failed to upload image: ${error.message}`);
      }
    };

    const res = await uploadAvatar(body.avatar);

     await this.userService.updateProfile(req.user.id, {
      ...body,
      avatar: res.imageUrl,
    });

    return req.user;
  }
}
