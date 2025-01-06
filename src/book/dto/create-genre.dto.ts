import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGenreDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'The name of the genre',
  })
  name: string;
}
