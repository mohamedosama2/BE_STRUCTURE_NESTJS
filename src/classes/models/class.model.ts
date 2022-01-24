import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as mongooseSchema } from 'mongoose';
import { addNameDto } from '../dto/add-names.dto';
import { Name, NameSchema } from './name.model';

export type ClassDocument = Class & Document;

@Schema({
  timestamps: true,
  toJSON: {
    getters: true,
    virtuals: true,
    transform: (_, doc: Record<string, unknown>) => {
      delete doc.__v;
      delete doc._id;
      delete doc.password;
      return {
        ...doc,
      };
    },
  },
})
export class Class {
  id?: string;

  @Prop({
    required: true,
    type: [NameSchema],
  })
  names: Record<string, any>[];
}

const ClassSchema = SchemaFactory.createForClass(Class);

export { ClassSchema };
