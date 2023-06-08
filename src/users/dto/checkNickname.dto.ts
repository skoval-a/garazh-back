import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class NickNameDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickName: string;
}
