import { db } from '../../../config';

const categoryTableName = `${db.prefix}_category`;
const articleTableName = `${db.prefix}_article`;

exports.seed = knex => knex(categoryTableName).del()
  .then(() => knex(categoryTableName).insert([
    {
      id: db.rootId,
      title: 'root',
      description: 'root',
      parent_id: null,
    },
  ]))
  .then(() => knex(categoryTableName).insert([
    {
      title: 'category-d0-b0',
      description: 'category-d0-b0',
      parent_id: db.rootId,
    },
  ]))
  .then(() => knex(categoryTableName).insert([
    {
      title: 'category-d0-b1',
      description: 'category-d0-b1',
      parent_id: db.rootId,
    },
  ]))
  .then(res => knex(categoryTableName).insert([
    {
      title: 'category-d1-b1',
      description: 'category-d1-b1',
      parent_id: res[0],
    },
  ]))
  .then(() => knex(articleTableName).insert([
    {
      title: 'article-d0-b0',
      content: 'article-d0-b0',
      category_id: db.rootId,
    },
  ]));