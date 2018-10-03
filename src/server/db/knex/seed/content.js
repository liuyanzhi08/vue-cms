import fs from 'fs';
import _path from 'path';
import _ from 'lodash';
import { path, db } from '../../../config';

const categoryTableName = `${db.prefix}_category`;
const articleTableName = `${db.prefix}_article`;

const readmePath = _path.resolve(path.root, 'README.md');
const readme = fs.readFileSync(readmePath).toString();
const firstLineIndex = readme.indexOf('\n');
const readmeTitle = _.trim(readme.substring(0, firstLineIndex + 1), '#');
const readmeContent = readme.substring(firstLineIndex);

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
  .then(res => knex(articleTableName).insert([
    {
      title: readmeTitle,
      content: readmeContent,
      category_id: res[0],
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
  .then(res => knex(articleTableName).insert([
    {
      title: 'article-d2-b1',
      content: 'article-d2-b1',
      category_id: res[0],
    },
  ]))
  .then(() => knex(articleTableName).insert([
    {
      title: 'article-d0-b0',
      content: 'article-d0-b0',
      category_id: db.rootId,
    },
  ]));
