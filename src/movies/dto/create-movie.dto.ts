import { IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title!: string;

  @IsNumber()
  release_year!: number;
}
