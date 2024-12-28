import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Book } from './book.schema';
import { User } from 'src/user/schemas/user.schema';

export type BookEditionDocument = BookEdition & Document;

@Schema({ timestamps: true, validateBeforeSave: true })
export class BookEdition extends Document {
  _id: string;

  @Prop({ ref: Book.name, type: mongoose.Types.ObjectId, required: true })
  book: Book;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false, type: mongoose.Schema.Types.Array })
  authors: string[];

  @Prop({ required: true })
  publisher: string;

  @Prop({ required: true })
  publicationDate: Date;

  @Prop({ required: true })
  isbn: number;

  @Prop({ default: false })
  deleted: boolean;

  @Prop({ required: true })
  pageCount: number;

  @Prop({ required: true })
  language: string;

  @Prop({ required: true })
  edition: string;

  @Prop({ required: false, default: Date.now })
  createdAt: Date;

  @Prop({ required: false, default: Date.now })
  updatedAt: Date;
}

export const BookEditionSchema = SchemaFactory.createForClass(BookEdition);
