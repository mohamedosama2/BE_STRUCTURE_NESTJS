import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';
import * as mongoose from 'mongoose';
import { User } from './_user.entity';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  _id: ObjectId;

  @Prop()
  content: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  author: User; // store id no object
}

export const PostSchema = SchemaFactory.createForClass(Post);
