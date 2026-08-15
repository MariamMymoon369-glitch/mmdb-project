import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return all movies', () => {
    const movies = service.getmovies();
    expect(movies).toHaveLength(10);
  });

  it('should return a movie by id', () => {
    const movie = service.movieById(3);

    expect(movie.title).toBe('Parasite');
  });

  it('should throw NotFoundException for an invalid id', () => {
    expect(() => service.movieById(999)).toThrow('Movie not found');
  });
});
