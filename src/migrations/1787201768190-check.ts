import { MigrationInterface, QueryRunner } from 'typeorm';

export class Check1787201768190 implements MigrationInterface {
  name = 'Check1787201768190';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_movie_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "movie_cast_person_id_fkey"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ALTER COLUMN "uuid" SET DEFAULT gen_random_uuid()`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "FK_a6c0ed450412f8365639b5a700b" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "FK_f8ef577a57b2521066bdb3a8fa5" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "FK_f8ef577a57b2521066bdb3a8fa5"`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" DROP CONSTRAINT "FK_a6c0ed450412f8365639b5a700b"`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "people" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" DROP DEFAULT`,
    );
    await queryRunner.query(
      `ALTER TABLE "movies" ALTER COLUMN "uuid" SET DEFAULT uuid_generate_v4()`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_person_id_fkey" FOREIGN KEY ("person_id") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "movie_cast" ADD CONSTRAINT "movie_cast_movie_id_fkey" FOREIGN KEY ("movie_id") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }
}
