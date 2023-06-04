import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  @IsString()

  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  nickName: string;

  @IsEmail()
  email: string;
}
