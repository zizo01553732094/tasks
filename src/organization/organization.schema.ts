import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Organization extends Document {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop([String]) // Members as an array of email strings
  members: string[];
}

export const OrganizationSchema = SchemaFactory.createForClass(Organization);
