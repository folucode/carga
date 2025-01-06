import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import mongoose, { ObjectId } from 'mongoose';

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
  @Transform(({ value }) => new mongoose.Schema.Types.ObjectId(value))
  genres: ObjectId;
}
