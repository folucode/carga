import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiRequest } from 'src/request.type';
import { BookEdition } from './schemas/book-edition.schema';
import { Book } from './schemas/book.schema';
import { CreateBookEditionDto } from './dto/create-book-edition.dto';
import { UpdateBookEditionDto } from './dto/update-book-edition.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
    @Request() req: ApiRequest,
  ): Promise<Book> {
    return this.bookService.createBook(createBookDto, req.user);
  }

  @Get(':bookId')
  findOne(@Param('bookId') bookId: string): Promise<Book> {
    return this.bookService.findBookById(bookId);
  }

  @Patch(':bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.updateBook(book, updateBookDto);
  }

  @Delete(':bookId')
  async remove(@Param('bookId') bookId: string): Promise<void> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.deleteBook(book);
  }

  @Post(':bookId/edition')
  async createBookEdition(
    @Param('bookId') bookId: string,
    @Body() createBookEditionDto: CreateBookEditionDto,
    @Request() req: ApiRequest,
  ): Promise<BookEdition> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.createBookEdition(book, createBookEditionDto);
  }

  @Get(':bookId/editions')
  async findBookEditions(
    @Param('bookId') bookId: string,
  ): Promise<BookEdition[]> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.findBookEditions(book);
  }

  @Get(':bookId/edition/:editionId')
  async findBookEdition(
    @Param('bookId') bookId: string,
    @Param('editionId') editionId: string,
  ) {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.findBookEditionById(editionId, book);
  }

  @Patch(':bookId/edition/:editionId')
  async updateBookEdition(
    @Param('bookId') bookId: string,
    @Param('editionId') editionId: string,
    @Body() updateBookEditionDto: UpdateBookEditionDto,
  ) {
    const book: Book = await this.bookService.findBookById(bookId);

    const bookEdition: BookEdition = await this.bookService.findBookEditionById(
      bookId,
      book,
    );

    return this.bookService.updateBookEdition(
      book,
      bookEdition,
      updateBookEditionDto,
    );
  }
}
