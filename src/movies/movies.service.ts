import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly movieRepository: Repository<Movie>,
  ) {}

  getmovies() {
    return this.movieRepository.find();
  }

  async movieById(id: number) {
    const movie = await this.movieRepository.findOneBy({ id });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  async create(movie: CreateMovieDto) {
    if (movie.release_year > new Date().getFullYear()) {
      throw new BadRequestException('Release year cannot be in the future');
    }

    const newMovie = this.movieRepository.create({
      title: movie.title,
      releaseYear: movie.release_year,
    });

    return this.movieRepository.save(newMovie);
  }
}
