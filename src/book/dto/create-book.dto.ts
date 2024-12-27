import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../schemas/genre.schema';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsArray()
  genres: Genre[];
}
