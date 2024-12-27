import { Transform } from 'class-transformer';
import {
  IsString,
  IsArray,
  IsNotEmpty,
  IsDate,
  IsNumber,
  IsISBN,
} from 'class-validator';
import { parseISO } from 'date-fns';
import { capitalise } from 'src/utils/string.util';

export class CreateBookEditionDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  @IsArray()
  @Transform(({ value }) => capitalise(value))
  authors: string[];

  @IsString()
  @IsNotEmpty()
  publisher: string;

  @IsDate()
  @IsNotEmpty()
  @Transform(({ value }) => parseISO(value))
  publicationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  @IsISBN()
  isbn: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageCount: number;

  @IsNotEmpty()
  @IsString()
  language: string;

  @IsNotEmpty()
  @IsString()
  edition: string;
}
