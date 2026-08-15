import { Controller, Get, Param, Post, Header, Body } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Get()
  async findAll() {
    return this.moviesService.getmovies();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const movie = await this.moviesService.movieById(Number(id));
    return movie || { error: 'Movie not found' };
  }

  @Post()
  @Header('Cache-Control', 'no-store')
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.moviesService.create(createMovieDto);
  }
}
