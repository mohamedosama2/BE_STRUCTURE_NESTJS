import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class FawryModel {
  @Prop({ required: true })
  fawryId: string;
}

export const FawrySchema = SchemaFactory.createForClass(FawryModel);
