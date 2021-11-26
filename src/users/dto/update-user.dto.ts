import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Address } from '../entities/address.entity';
import { addFawryDto } from './fawry.dto';
import { addPaypalDto } from './paypal.dto';

export class UpdateUserDto {
  @IsBoolean()
  @IsOptional()
  enabled?: Boolean;

  @IsString()
  @IsOptional()
  photo?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsArray()
  @IsOptional()
  favouritePaymentMethods?: any;

  @Type(() => Address)
  @IsOptional()
  address?: Address;
}
