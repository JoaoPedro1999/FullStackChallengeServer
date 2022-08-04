import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateArticle1659575943440 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'articles',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'featured',
            type: 'boolean',
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'url',
            type: 'varchar',
          },
          {
            name: 'imageUrl',
            type: 'varchar',
          },
          {
            name: 'newsSite',
            type: 'varchar',
          },
          {
            name: 'summary',
            type: 'varchar',
          },
          {
            name: 'publishedAt',
            type: 'timestamptz',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('articles');
  }
}
