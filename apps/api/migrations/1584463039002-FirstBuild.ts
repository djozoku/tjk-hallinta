import { MigrationInterface, QueryRunner } from 'typeorm';

export class FirstBuild1584463039002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "sample" ("id" SERIAL NOT NULL, "text" character varying NOT NULL, CONSTRAINT "PK_SAMPLE_ID" PRIMARY KEY ("id"))`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "sample"`, undefined);
  }
}
