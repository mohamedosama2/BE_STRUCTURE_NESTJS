import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  role: string;

  @Prop({ required: true })
  bio: number;
}

const TeacherSchema = SchemaFactory.createForClass(Teacher);

export { TeacherSchema };
