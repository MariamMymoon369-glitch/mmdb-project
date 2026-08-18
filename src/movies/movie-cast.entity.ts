import { Column, Entity, PrimaryColumn, ManyToOne, JoinColumn } from 'typeorm';

import { Movie } from './movie.entity';
import { Person } from './people.entity';

@Entity('movie_cast')
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

  @ManyToOne(() => Movie)
  @JoinColumn({ name: 'movie_id' })
  movie!: Movie;

  @ManyToOne(() => Person)
  @JoinColumn({ name: 'person_id' })
  person!: Person;
}
