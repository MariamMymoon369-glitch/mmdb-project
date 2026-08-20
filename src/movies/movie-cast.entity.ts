import {
  Column,
  Entity,
  Index,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Movie } from './movie.entity';
import { Person } from './people.entity';

@Entity('movie_cast')
@Index('movie_cast_person_idx', ['personId'])
export class MovieCast {
  @PrimaryColumn({ type: 'int', name: 'movie_id' })
  movieId!: number;

  @PrimaryColumn({ type: 'int', name: 'person_id' })
  personId!: number;

  @PrimaryColumn({
    type: 'text',
    name: 'character_name',
  })
  characterName!: string;

  @Column({
    type: 'int',
    name: 'billing_order',
    default: 0,
  })
  billingOrder!: number;

  @ManyToOne(() => Movie, (movie) => movie.cast, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @ManyToOne(() => Person, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'person_id' })
  person!: Person;
}
