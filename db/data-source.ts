// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: process.env.NODE_ENV ? '.env' : `.env.development.local`,
});

import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: ['src/**/!(base).entity{.ts,.js}'],

  migrations: ['db/migrations/*{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'development' || false,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
