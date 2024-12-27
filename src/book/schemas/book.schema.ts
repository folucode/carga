import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Genre } from './genre.schema';
import { User } from 'src/user/schemas/user.schema';

export type BookDocument = Book & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class Book extends Document {
  _id: string;

  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ ref: Genre.name, type: [mongoose.Types.ObjectId], required: true })
  genres: Genre[];

  @Prop({ ref: User.name, type: mongoose.Types.ObjectId, required: true })
  createdBy: User;

  @Prop({ required: true })
  description: string;

  @Prop({ default: false, required: false })
  deleted: boolean;

  @Prop({ default: Date.now, required: false })
  createdAt: Date;

  @Prop({ default: Date.now, required: false })
  updatedAt: Date;
}

export const BookSchema = SchemaFactory.createForClass(Book);
