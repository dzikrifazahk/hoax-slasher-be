import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as path from 'path';

config();
const dbPort = process.env.DB_PORT;
const entityFilePath = path.join('dist', 'src', 'modules', '**', '*.entity.js');

export const dataSourceOpt: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(dbPort),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [entityFilePath],
  synchronize: true,
  logging: true,
  migrations: ['dist/database/migrations/*.js'],
};

const dataSource = new DataSource(dataSourceOpt);

export default dataSource;
