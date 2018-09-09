import { db } from '../config'
import { knex } from '../db/index';
import { err } from "../helper/logger";

const userTable = `${db.prefix}_user`;

export default {
  get: (id) => {
    return knex(userTable).where({ id }).then((res) => {
      if (res.length) {
        return res[0];
      } else {
        return res;
      }
    }, (_err) => {
      err(_err);
    });
  },
  query: (query) => {
    return knex(userTable).where(query);
  },
  create: (data) => {
    return knex(userTable).insert(data);
  },
};
