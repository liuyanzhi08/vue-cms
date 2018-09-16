import knex from 'knex';
import { db } from '../config';

export default knex({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: db.username,
    password: db.password,
    database: db.database,
  },
});
