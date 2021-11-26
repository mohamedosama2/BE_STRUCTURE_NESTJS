import { IsNotEmpty, IsString } from 'class-validator';
export class AddressDto {
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  street: string;
}
