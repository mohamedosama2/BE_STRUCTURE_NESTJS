import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PaymentMethod } from './payment-kind.enum';

// eslint-disable-next-line @typescript-eslint/naming-convention
@Schema({ _id: false, discriminatorKey: 'kind' })
class PaymentModel {
  @Prop({ type: String, required: true, enum: Object.values(PaymentMethod) })
  kind: PaymentMethod;

  @Prop({ required: true })
  description: string;
}

export const PaymentSchema = SchemaFactory.createForClass(PaymentModel);
