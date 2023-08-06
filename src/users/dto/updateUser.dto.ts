import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class updateProfileDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;
  @ApiProperty()

  @IsString()
  phoneNumber: string;
  @ApiProperty()

  @IsString()
  country: string;
  @ApiProperty()

  @IsString()
  city: string;
  @ApiProperty()

  @IsString()
  description: string;

  @IsString()
  avatar: string;
}
