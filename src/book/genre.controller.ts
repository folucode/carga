import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ApiRequest } from 'src/request.type';
import { GenreService } from './genre.service';
import { Genre } from './schemas/genre.schema';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @ApiOperation({
    summary: 'Get all book genres',
    description: 'Allows users to get all book genres',
  })
  @ApiResponse({
    type: [Genre],
  })
  @Get()
  findAll(): Promise<Genre[]> {
    return this.genreService.getAllGenres();
  }

  @ApiOperation({
    summary: 'Get book genre',
    description: 'Allows users to get a specific book genre',
  })
  @ApiResponse({ type: Genre })
  @Get(':id')
  async findGenre(
    @Param('id') id: string,
    @Request() req: ApiRequest,
  ): Promise<Genre> {
    return this.genreService.findGenreById(id);
  }

  @ApiOperation({
    summary: 'Update a genre',
    description: 'Allows users to update the details of a genre',
  })
  @ApiResponse({ type: Genre })
  @Patch(':id')
  async updateGenre(
    @Param('id') id: string,
    @Body() data: UpdateGenreDto,
    @Request() req: ApiRequest,
  ): Promise<Genre> {
    const genre: Genre = await this.genreService.findGenreById(id);

    return this.genreService.updateGenre(genre, data);
  }

  @ApiOperation({
    summary: 'Create a genre',
    description: 'Allows authenticated users to create a genre',
  })
  @ApiResponse({ type: Genre })
  @Post()
  async createGenre(
    @Body() data: CreateGenreDto,
    @Request() req: ApiRequest,
  ): Promise<Genre> {
    return this.genreService.createGenre(data);
  }
}
