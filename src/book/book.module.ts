import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './schemas/book.schema';
import { Genre, GenreSchema } from './schemas/genre.schema';
import { BookEdition, BookEditionSchema } from './schemas/book-edition.schema';
import { BookRepository } from './repositories/book.repository';
import { BookEditionRepository } from './repositories/book-edition.schema';
import { GenreService } from './genre.service';
import { GenreRepository } from './repositories/genre.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
      {
        name: Genre.name,
        schema: GenreSchema,
      },
      {
        name: BookEdition.name,
        schema: BookEditionSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [
    BookService,
    BookRepository,
    BookEditionRepository,
    GenreService,
    GenreRepository,
  ],
  exports: [
    BookService,
    BookRepository,
    BookEditionRepository,
    GenreService,
    GenreRepository,
  ],
})
export class BookModule {}
