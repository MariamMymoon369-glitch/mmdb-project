import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  title!: string;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsNumber()
  release_year!: number;
}
