import path from 'path';
import { db } from '../config';

const BASE_PATH = __dirname;
const MIGRATION_PATH = path.join(BASE_PATH, 'migration');
const SEED_PATH = path.join(BASE_PATH, 'seed');

const development = {
  client: 'mysql',
  connection: {
    database: db.database,
    user: db.username,
    password: db.password,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: MIGRATION_PATH,
  },
  seeds: {
    directory: SEED_PATH,
  },
};

const staging = {
  client: 'mysql',
  connection: {
    database: db.database,
    user: db.username,
    password: db.password,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: MIGRATION_PATH,
  },
  seeds: {
    directory: SEED_PATH,
  },
};

const production = {
  client: 'mysql',
  connection: {
    database: db.database,
    user: db.username,
    password: db.password,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    directory: MIGRATION_PATH,
  },
  seeds: {
    directory: SEED_PATH,
  },
};

export {
  development,
  staging,
  production,
};
