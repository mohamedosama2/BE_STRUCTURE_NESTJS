import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Class } from 'src/classes/models/class.model';
import { NameSchema } from 'src/classes/models/name.model';
import { User } from 'src/users/models/_user.model';

export type CourseDocument = Course & Document;

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
export class Course {
  id?: string;

  @Prop(
    raw([
      {
        _id: false,
        value: {
          required: true,
          type: String,
          index: true,
        },
        lang: {
          required: true,
          type: String,
        },
      },
    ]),
  )
  names: Record<string, any>[];

  @Prop(
    raw({
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Class.name,
        required: true,
      },
      names: [NameSchema],
    }),
  )
  class: Record<string, any>;

  @Prop(
    raw({
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User.name,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
    }),
  )
  teacher: Record<string, any>;
}

const CourseSchema = SchemaFactory.createForClass(Course);

export { CourseSchema };
