import { IsNotEmpty, IsString } from 'class-validator';
export class addPaymentMethod {
  @IsString()
  @IsNotEmpty()
  kind: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}
