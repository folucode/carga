import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsISBN,
  IsOptional,
} from 'class-validator';
import { parseISO } from 'date-fns';
import { capitalise } from 'src/utils/string.util';

export class CreateBookEditionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The edition title',
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => capitalise(value))
  @ApiProperty({
    type: [String],
    isArray: true,
    required: true,
    description: 'An array list of the authors of the book',
  })
  authors: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    description: 'The publisher of the book',
  })
  publisher: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => parseISO(value))
  @ApiProperty({
    type: Date,
    required: true,
    description: 'The book publication date',
  })
  publicationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsISBN()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The book isbn',
  })
  isbn: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The book page count',
  })
  pageCount: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: Number,
    required: true,
    description: 'The language the book is written',
  })
  language: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: Number,
    required: false,
    description: 'The language the book edition',
  })
  @IsOptional()
  edition?: string;
}
