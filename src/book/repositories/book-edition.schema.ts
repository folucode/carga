import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'src/mongo.repository';
import { BookEdition } from '../schemas/book-edition.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BookEditionRepository extends MongoRepository<BookEdition> {
  constructor(
    @InjectModel(BookEdition.name) private bookEditionModel: Model<BookEdition>,
  ) {
    super(bookEditionModel);
  }

  async fingEditionByTitle(title: string): Promise<BookEdition> {
    return this.bookEditionModel.findOne({ title });
  }
}
