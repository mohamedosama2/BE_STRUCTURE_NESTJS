import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class PayPalModel {
  @Prop({ required: true })
  paypalId: string;
}

export const PayPalSchema = SchemaFactory.createForClass(PayPalModel);
