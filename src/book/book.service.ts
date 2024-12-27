import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookEdition } from './schemas/book-edition.schema';
import { BookRepository } from './repositories/book.repository';
import { BookEditionRepository } from './repositories/book-edition.schema';
import { Book } from './schemas/book.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateBookEditionDto } from './dto/create-book-edition.dto';
import { UpdateBookEditionDto } from './dto/update-book-edition.dto';

@Injectable()
export class BookService {
  constructor(
    private readonly bookRepo: BookRepository,
    private readonly bookEditionRepo: BookEditionRepository,
  ) {}

  async createBook(createBookDto: CreateBookDto, user: User): Promise<Book> {
    const book: Book = await this.bookRepo.findOne({
      ...createBookDto,
      user,
    });

    return book;
  }

  async createBookEdition(
    book: Book,
    createBookEditionDto: CreateBookEditionDto,
  ): Promise<BookEdition> {
    const existingEdition = await this.bookEditionRepo.fingEditionByTitle(
      createBookEditionDto.title,
    );

    if (existingEdition)
      throw new BadRequestException(
        `An edition with the title: [${createBookEditionDto.title}] already exists`,
      );

    return this.bookEditionRepo.create({
      ...createBookEditionDto,
      book,
    });
  }

  async findBookById(id: string): Promise<Book> {
    const book: Book = await this.bookRepo.findById(id);

    if (book.deleted)
      throw new BadRequestException(`book with id: ${id} does not exist`);

    return book;
  }

  async findBookEditionById(id: string, book: Book): Promise<BookEdition> {
    const bookEdition: BookEdition = await this.bookEditionRepo.findOne({
      _id: id,
      book: book._id,
    });

    if (bookEdition.deleted)
      throw new BadRequestException(
        `book edition with id: ${id} does not exist`,
      );

    return bookEdition;
  }

  async findBookEditions(book: Book): Promise<BookEdition[]> {
    return this.bookEditionRepo.findMany({
      book: book._id,
      deleted: false,
    });
  }

  updateBook(book: Book, updateBookDto: UpdateBookDto): Promise<Book> {
    return this.bookRepo.updateOne(
      {
        _id: book._id,
      },
      {
        $set: updateBookDto,
      },
    );
  }

  updateBookEdition(
    book: Book,
    edition: BookEdition,
    updateBookEditionDto: UpdateBookEditionDto,
  ): Promise<BookEdition> {
    return this.bookEditionRepo.updateOne(
      {
        _id: edition._id,
        book: book._id,
      },
      {
        $set: updateBookEditionDto,
      },
    );
  }

  deleteBook(book: Book): Promise<void> {
    return this.bookRepo.softDelete(book._id);
  }
}
