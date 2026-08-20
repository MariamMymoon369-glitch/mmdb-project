import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  ParseIntPipe,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { Movie } from './movie.entity';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post()
  async create(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
    return await this.moviesService.create(createMovieDto);
  }

  @Get('test-error')
  testError() {
    throw new InternalServerErrorException('Test server error');
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1,
    @Query('limit', ParseIntPipe) limit = 10,
  ): Promise<Movie[]> {
    return await this.moviesService.findAll(Number(page), Number(limit));
  }

  //@Get('n-plus-one')
  //async findAllNPlusOne(): Promise<Movie[]> {
  // return await this.moviesService.findAllNPlusOne();
  //}

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Movie | null> {
    return await this.moviesService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateMovieDto: CreateMovieDto,
  ): Promise<Movie | null> {
    return await this.moviesService.update(Number(id), updateMovieDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.moviesService.remove(Number(id));
  }
}
