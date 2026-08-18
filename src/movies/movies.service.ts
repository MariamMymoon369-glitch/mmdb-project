import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { MovieCast } from './movie-cast.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private readonly moviesRepository: Repository<Movie>,
    @InjectRepository(MovieCast)
    private readonly movieCastsRepository: Repository<MovieCast>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.cast', 'movieCast')
      .leftJoinAndSelect('movieCast.person', 'person')
      .getMany();
  }

  async findOne(id: number): Promise<Movie | null> {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException('movie not found');
    }

    return movie;
  }

  async update(
    id: number,
    updateMovieDto: CreateMovieDto,
  ): Promise<Movie | null> {
    await this.moviesRepository.update(id, updateMovieDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.moviesRepository.delete(id);
  }
}
