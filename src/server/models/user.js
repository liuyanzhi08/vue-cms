import db from '../db/index';

export default {
  get: (id) => {
    return db('user').where({ id }).then((res) => {
      if (res.lenght) {
        return res[0];
      } else {
        return res;
      }
    });
  },
  query: (query) => {
    return db('user').where(query);
  },
  create: (data) => {
    return db('user').insert(data);
  },
};