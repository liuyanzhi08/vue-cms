import { db } from '../config';
import { knex } from '../db/index';
import { err } from '../helper/logger';

const userTable = `${db.prefix}_user`;

export default {
  get: id => knex(userTable).where({ id }).then((res) => {
    if (res.length) {
      return res[0];
    }
    return res;
  }, (_err) => {
    err(_err);
  }),
  query: query => knex(userTable).where(query),
  create: data => knex(userTable).insert(data),
};
