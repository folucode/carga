import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Genre } from '../schemas/genre.schema';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'The book title',
    type: String,
    required: true,
  })
  title: string;

  @IsNotEmpty()
  @IsArray()
  @ApiProperty({
    description: 'An array of book genre IDs',
    type: [String],
    isArray: true,
    required: true,
  })
  genres: string[];
}
