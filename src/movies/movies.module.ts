import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movie.entity';
import { MovieCast } from './movie-cast.entity';
import { Person } from './people.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, MovieCast, Person])],
  controllers: [MoviesController],
  providers: [MoviesService],
  exports: [MoviesService],
})
export class MoviesModule {}
