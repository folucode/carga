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
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @ApiOperation({
    summary: 'Create a new book record',
    description:
      'Allows authenticated users to create a new book by providing necessary details like title, author, and genre.',
  })
  @ApiResponse({
    type: Book,
  })
  @ApiBearerAuth('user')
  @Post()
  createBook(
    @Body() createBookDto: CreateBookDto,
    @Request() req: ApiRequest,
  ): Promise<Book> {
    console.log({ createBookDto, u: req.user });

    return this.bookService.createBook(createBookDto, req.user);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Get a book record',
    description:
      'Allows an authenticated user to get a specific book; returns the book if found, throws an error otherwise',
  })
  @ApiResponse({ type: Book })
  @Get(':bookId')
  findOne(@Param('bookId') bookId: string): Promise<Book> {
    return this.bookService.findBookById(bookId);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Update a book record',
    description:
      'Allows an authenticated user to edit a book. Users can only edit books that they added',
  })
  @ApiResponse({ type: Book })
  @Patch(':bookId')
  async updateBook(
    @Param('bookId') bookId: string,
    @Body() updateBookDto: UpdateBookDto,
    @Request() req: ApiRequest,
  ): Promise<Book> {
    const book: Book = await this.bookService.findBook(bookId, req.user);

    return this.bookService.updateBook(book, updateBookDto);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Delete a book record',
    description:
      'Allows an authenticated user to delete a book record. Users can only delete books they added',
  })
  @ApiResponse({ type: Book })
  @Delete(':bookId')
  async deleteBook(
    @Param('bookId') bookId: string,
    @Request() req: ApiRequest,
  ): Promise<Book> {
    const book: Book = await this.bookService.findBook(bookId, req.user);

    return this.bookService.deleteBook(book);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Create a book edition record',
    description:
      'Allows an authenticated user to create an edition of a book by providing necessary details.',
  })
  @ApiResponse({ type: BookEdition })
  @Post(':bookId/edition')
  async createBookEdition(
    @Param('bookId') bookId: string,
    @Body() createBookEditionDto: CreateBookEditionDto,
    @Request() req: ApiRequest,
  ): Promise<BookEdition> {
    const book: Book = await this.bookService.findBook(bookId, req.user);

    return this.bookService.createBookEdition(book, createBookEditionDto);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Get book editions',
    description:
      'This allows an authenticated user to get the editions of a book. It returns all the editions of a book',
  })
  @ApiResponse({ type: [BookEdition] })
  @Get(':bookId/editions')
  async findBookEditions(
    @Param('bookId') bookId: string,
  ): Promise<BookEdition[]> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.findBookEditions(book);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Get a book edition',
    description:
      'Allows an authenticated user to get a specific edition of a book',
  })
  @ApiResponse({ type: BookEdition })
  @Get(':bookId/edition/:editionId')
  async findBookEdition(
    @Param('bookId') bookId: string,
    @Param('editionId') editionId: string,
  ): Promise<BookEdition> {
    const book: Book = await this.bookService.findBookById(bookId);

    return this.bookService.findBookEditionById(editionId, book);
  }

  @ApiBearerAuth('user')
  @ApiOperation({
    summary: 'Update a book edition',
    description:
      'Allows an authenticated user to update a specific edition of a book. Users can only update books they added.',
  })
  @ApiResponse({ type: BookEdition })
  @Patch(':bookId/edition/:editionId')
  async updateBookEdition(
    @Param('bookId') bookId: string,
    @Param('editionId') editionId: string,
    @Body() updateBookEditionDto: UpdateBookEditionDto,
    @Request() req: ApiRequest,
  ): Promise<BookEdition> {
    const book: Book = await this.bookService.findBook(bookId, req.user);

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
