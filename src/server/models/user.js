import { db as dbs } from '../config'
import db from '../db/index';

const userTable = `${dbs.prefix}_user`;

export default {
  get: (id) => {
    return db(userTable).where({ id }).then((res) => {
      if (res.length) {
        return res[0];
      } else {
        return res;
      }
    });
  },
  query: (query) => {
    return db(userTable).where(query);
  },
  create: (data) => {
    return db(userTable).insert(data);
  },
};
