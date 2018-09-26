import { db } from '../../../config';

const tableName = `${db.prefix}_category`;

exports.seed = knex => knex(tableName).del()
  .then(() => knex(tableName).insert([
    {
      id: db.rootId,
      title: 'root',
      description: 'root',
      parent_id: null,
    },
  ]))
  .then(() => knex(tableName).insert([
    {
      title: 'category-d0-b0',
      description: 'category-d0-b0',
      parent_id: db.rootId,
    },
  ]))
  .then(() => knex(tableName).insert([
    {
      title: 'category-d0-b1',
      description: 'category-d0-b1',
      parent_id: db.rootId,
    },
  ]))
  .then(res => knex(tableName).insert([
    {
      title: 'category-d1-b1',
      description: 'category-d1-b1',
      parent_id: res[0],
    },
  ]));
