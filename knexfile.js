require("babel-register");
require("babel-polyfill");

const path = require('path');
const db = require('./src/server/config').db;

const BASE_PATH = path.join(__dirname, 'src', 'server', 'db');
const MIGRATION_PATH = path.join(BASE_PATH, 'migration');
const SEED_PATH = path.join(BASE_PATH, 'seed');

module.exports = {

  development: {
    client: 'mysql',
    connection: {
      database: db.database,
      user: db.username,
      password: db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: MIGRATION_PATH
    },
    seeds: {
      directory: SEED_PATH
    }
  },

  staging: {
    client: 'mysql',
    connection: {
      database: db.database,
      user: db.username,
      password: db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: MIGRATION_PATH
    },
    seeds: {
      directory: SEED_PATH
    }
  },

  production: {
    client: 'mysql',
    connection: {
      database: db.database,
      user: db.username,
      password: db.password
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: MIGRATION_PATH
    },
    seeds: {
      directory: SEED_PATH
    }
  }

};
