import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AddressDocument = Address & Document;

@Schema({
  toJSON: {
    transform: (_, doc: Record<string, unknown>) => {
      delete doc._id;
      return {
        ...doc,
      };
    },
  },
})
export class Address {
  _id: string;

  @Prop({ required: true, type: String })
  city: string;

  @Prop({ required: true, type: String })
  street: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
