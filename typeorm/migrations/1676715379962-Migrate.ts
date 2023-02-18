import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Migrate1676715379962 implements MigrationInterface {
  // up fzr uma nova versão
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_entity',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
            unsigned: true,
          },
          {
            name: 'name',
            type: 'varchar',
            length: '64',
          },
          {
            name: 'email',
            type: 'varchar',
            length: '128',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
            length: '128',
          },
          {
            name: 'birthAt',
            type: 'date',
            length: '128',
            isNullable: true,
          },
          {
            name: 'role',
            type: 'int',
            default: '1',
          },
          {
            name: 'createAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
          {
            name: 'updateAt',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP()',
          },
        ],
      }),
    );
  }

  // down é derrubar uma versão
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_entity');
  }
}
