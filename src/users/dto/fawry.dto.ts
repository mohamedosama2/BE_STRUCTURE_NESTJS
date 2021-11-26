import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { addPaymentMethod } from './addPaymentMethod.dto';
export class addFawryDto extends addPaymentMethod {
  @IsString()
  fawryId: string;
}
