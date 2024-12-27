import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from '../schemas/book.schema';
import { Model } from 'mongoose';
import { MongoRepository } from 'src/mongo.repository';

@Injectable()
export class BookRepository extends MongoRepository<Book> {
  constructor(@InjectModel(Book.name) private readonly bookModel: Model<Book>) {
    super(bookModel);
  }
}
