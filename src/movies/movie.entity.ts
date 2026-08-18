import {
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { MovieCast } from './movie-cast.entity';

@Entity('movies')
@Index('movies_year_idx', ['releaseYear'])
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'uuid',
    unique: true,
    default: () => 'gen_random_uuid()',
  })
  uuid!: string;

  @Column({ type: 'text' })
  title!: string;

  @Column({ type: 'int', name: 'release_year' })
  releaseYear!: number;

  @Column({ type: 'int', name: 'runtime_minutes', nullable: true })
  runtimeMinutes: number | null = null;

  @Column({ type: 'text', nullable: true })
  overview: string | null = null;

  @Column({ type: 'text', name: 'poster_url', nullable: true })
  posterUrl: string | null = null;

  @Column({ type: 'text', name: 'trailer_url', nullable: true })
  trailerUrl: string | null = null;

  @Column({ type: 'text', nullable: true })
  language: string | null = null;

  @OneToMany(() => MovieCast, (movieCast: MovieCast) => movieCast.movie)
  cast!: MovieCast[];
}
