import { PartialType } from '@nestjs/mapped-types';
import { CreateBookEditionDto } from './create-book-edition.dto';

export class UpdateBookEditionDto extends PartialType(CreateBookEditionDto) {}
