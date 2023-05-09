import { IsEmail, IsNotEmpty, IsString, isString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProfileDto {
  @ApiProperty()
  @IsString()
  user_name: string;

  @IsEmail()
  email: string;
}
