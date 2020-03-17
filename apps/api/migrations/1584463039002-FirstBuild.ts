import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class FirstBuild1584463039002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sample',
        columns: [
          { name: 'id', type: 'integer', isPrimary: true, isGenerated: true, isNullable: false },
          { name: 'text', type: 'character varying', isNullable: false },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sample');
  }
}
