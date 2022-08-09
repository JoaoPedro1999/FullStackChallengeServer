import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'ec2-3-222-74-92.compute-1.amazonaws.com',
  port: 5432,
  username: 'mawmvgylkyugsf',
  password: '0c05d4803d30f1d8b472f6381d7582188ccc7e09fb3f3c45080a915ec977d7fa',
  database: 'd8lhoo6k1iep7k',
  entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
  migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
  ssl: {
    rejectUnauthorized: false,
  },
  // logging: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch(err => {
    console.error('Error during Data Source initialization', err);
  });
