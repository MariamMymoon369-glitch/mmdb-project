import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMovieDto } from './dto/create-movie.dto';
import { BadRequestException } from '@nestjs/common';

type Movie = {
  id: number;
  title: string;
  release_year: number;
};

@Injectable()
export class MoviesService {
  private movies: Movie[] = [
    { id: 1, title: 'Arrival', release_year: 2016 },
    { id: 2, title: 'Whiplash', release_year: 2014 },
    { id: 3, title: 'Parasite', release_year: 2019 },
    { id: 4, title: 'Mad Max: Fury Road', release_year: 2015 },
    { id: 5, title: 'Get Out', release_year: 2017 },
    { id: 6, title: 'Blade Runner 2049', release_year: 2017 },
    { id: 7, title: 'The Grand Budapest Hotel', release_year: 2014 },
    { id: 8, title: 'Spirited Away', release_year: 2001 },
    { id: 9, title: 'Portrait of a Lady on Fire', release_year: 2019 },
    {
      id: 10,
      title: 'Everything Everywhere All at Once',
      release_year: 2022,
    },
  ];

  getmovies(): Movie[] {
    return this.movies;
  }

  movieById(id: number): Movie {
    const movie = this.movies.find((m) => m.id === id);

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    return movie;
  }

  create(movie: CreateMovieDto) {
    if (movie.release_year > new Date().getFullYear()) {
      throw new BadRequestException('Release year cannot be in the future');
    }

    const newMovie: Movie = {
      id: this.movies.length + 1,
      ...movie,
    };

    this.movies.push(newMovie);

    return newMovie;
  }
}
