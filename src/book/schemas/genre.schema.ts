import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GenreDocument = Genre & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Genre extends Document {
  _id: string;

  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ default: Date.now, required: false })
  createdAt: Date;

  @Prop({ default: Date.now, required: false })
  updatedAt: Date;
}

export const GenreSchema = SchemaFactory.createForClass(Genre);
