import { BadRequestException, Injectable } from '@nestjs/common';
import { GenreRepository } from './repositories/genre.repository';
import { Genre } from './schemas/genre.schema';
import { ObjectId } from 'mongodb';
import { genreMessages } from 'messages/genre';
import { FilterQuery } from 'mongoose';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { CreateGenreDto } from './dto/create-genre.dto';

@Injectable()
export class GenreService {
  constructor(private readonly genreRepo: GenreRepository) {}

  async getGenresByIds(ids: string[] | ObjectId[]): Promise<Genre[]> {
    return this.genreRepo.findMany({
      _id: {
        $in: ids,
      },
    });
  }

  async findGenreById(id: string): Promise<Genre> {
    const genre: Genre = await this.genreRepo.findById(id);

    if (genre) throw new BadRequestException(genreMessages.notFound);

    return genre;
  }

  async getAllGenres(criteria: FilterQuery<Genre> = {}): Promise<Genre[]> {
    return this.genreRepo.findMany(criteria);
  }

  async updateGenre(genre: Genre, data: UpdateGenreDto): Promise<Genre> {
    return this.genreRepo.updateOne(
      {
        _id: genre._id,
      },
      { ...data },
    );
  }

  async createGenre(data: CreateGenreDto): Promise<Genre> {
    return this.genreRepo.create({ ...data });
  }
}
