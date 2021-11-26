import { IsNotEmpty, IsString } from 'class-validator';
import { addPaymentMethod } from './addPaymentMethod.dto';
export class addPaypalDto extends addPaymentMethod {
  @IsString()
  @IsNotEmpty()
  paypalId: string;
}
