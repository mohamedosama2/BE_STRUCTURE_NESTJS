import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Constants } from '../../utils/constants';
export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsString()
  @ApiProperty()
  @Matches(Constants.PHONE_REGX, { message: 'phone is invalid' })
  phone: string;
}
