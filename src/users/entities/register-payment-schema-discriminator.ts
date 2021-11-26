import { Schema } from 'mongoose';
import { FawrySchema } from './fawry.entity';
import { PaymentMethod } from './payment-kind.enum';
import { PayPalSchema } from './paypal.entity';

export function registerPaymentSchemaDiscriminator(
  animalsArraySchema: Schema.Types.DocumentArray,
): void {
  animalsArraySchema.discriminator(PaymentMethod.Fawry, FawrySchema);
  animalsArraySchema.discriminator(PaymentMethod.Paypal, PayPalSchema);
}
