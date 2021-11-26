import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { IsNonPrimitiveArray } from 'src/utils/customValidationDecorator';
import { Address } from '../entities/address.entity';
import { addPaymentMethod } from './addPaymentMethod.dto';
import { AddressDto } from './address.dto';
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

  @IsOptional()
  @ValidateNested({ each: true })
  @IsNonPrimitiveArray()
  @Type(() => addPaymentMethod, {
    keepDiscriminatorProperty: true,
    discriminator: {
      property: 'kind',
      subTypes: [
        { value: addFawryDto, name: 'fawry' },
        { value: addPaypalDto, name: 'paypal' },
      ],
    },
  })
  favouritePaymentMethods?: (addPaypalDto | addFawryDto)[];

  @IsOptional()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  address?: AddressDto;
}
