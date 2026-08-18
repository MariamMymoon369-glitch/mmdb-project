import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('people')
export class Person {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    type: 'uuid',
    unique: true,
    default: () => 'gen_random_uuid()',
  })
  uuid!: string;

  @Column({ type: 'text' })
  name!: string;

  @Column({ type: 'text', nullable: true, name: 'photo_url' })
  photoUrl: string | null = null;

  @Column({ type: 'text', nullable: true })
  biography: string | null = null;

  @Column({ type: 'text', nullable: true })
  gender: string | null = null;

  @Column({ type: 'date', nullable: true })
  birthdate: Date | null = null;

  @Column({ type: 'text', nullable: true, name: 'place_of_birth' })
  placeOfBirth: string | null = null;

  @Column({ type: 'text', nullable: true, name: 'known_for' })
  knownFor: string | null = null;
}
