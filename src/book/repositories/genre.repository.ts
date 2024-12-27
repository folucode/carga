import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'src/mongo.repository';
import { Genre } from '../schemas/genre.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class GenreRepository extends MongoRepository<Genre> {
  constructor(
    @InjectModel(Genre.name) private readonly genreModel: Model<Genre>,
  ) {
    super(genreModel);
  }
}
