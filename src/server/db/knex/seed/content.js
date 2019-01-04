import fs from 'fs';
import $path from 'path';
import _ from 'lodash';
import faker from 'faker';
import config from '../../../config';
import articleHelper from '../../../helper/article';

const { db } = config;

const categoryTableName = `${db.prefix}_category`;
const articleTableName = `${db.prefix}_article`;
const readmePath = $path.resolve('../../../../README.md');
const readme = fs.readFileSync(readmePath).toString();
const firstLineIndex = readme.indexOf('\n');
const readmeTitle = _.trim(readme.substring(0, firstLineIndex + 1), '#');
const readmeContent = readme.substring(firstLineIndex);
const defaultTheme = 'default';

exports.seed = knex => knex(categoryTableName).del()
  .then(() => knex(categoryTableName).insert([
    {
      id: db.rootId,
      title: 'root',
      description: 'root',
      theme: defaultTheme,
      parent_id: null,
    },
  ]))
  .then(() => knex(categoryTableName).insert([
    {
      title: 'category-d0-b0',
      description: 'category-d0-b0',
      theme: defaultTheme,
      parent_id: db.rootId,
    },
  ]))
  .then(res => knex(articleTableName).insert([
    {
      title: readmeTitle,
      content: readmeContent,
      summary: articleHelper.summary(readmeContent),
      theme: defaultTheme,
      category_id: res[0],
    },
  ]))
  .then(() => knex(categoryTableName).insert([
    {
      title: 'category-d0-b1',
      description: 'category-d0-b1',
      theme: defaultTheme,
      parent_id: db.rootId,
    },
  ]))
  .then((res) => {
    const promises = [];
    const content = faker.lorem.paragraphs();
    promises.push(knex(articleTableName).insert([
      {
        title: faker.lorem.sentence(),
        content,
        summary: articleHelper.summary(content),
        theme: defaultTheme,
        category_id: res[0],
      },
    ]));
    promises.push(knex(categoryTableName).insert([
      {
        title: 'category-d1-b1',
        description: 'category-d1-b1',
        theme: defaultTheme,
        parent_id: res[0],
      },
    ]));
    return Promise.all(promises).then(all => all[1]);
  })
  .then((res) => {
    const contents = [
      faker.lorem.paragraphs(),
      faker.lorem.paragraphs(),
      faker.lorem.paragraphs(),
    ];
    return knex(articleTableName).insert([
      {
        title: faker.lorem.sentence(),
        content: contents[0],
        summary: articleHelper.summary(contents[0]),
        theme: defaultTheme,
        category_id: res[0],
      },
      {
        title: faker.lorem.sentence(),
        content: contents[1],
        summary: articleHelper.summary(contents[1]),
        theme: defaultTheme,
        category_id: res[0],
      },
      {
        title: faker.lorem.sentence(),
        content: contents[2],
        summary: articleHelper.summary(contents[2]),
        theme: defaultTheme,
        category_id: res[0],
      },
    ]);
  })
  .then(() => {
    const content = faker.lorem.paragraphs();
    return knex(articleTableName).insert([
      {
        title: faker.lorem.sentence(),
        content,
        summary: articleHelper.summary(content),
        theme: defaultTheme,
        category_id: db.rootId,
      },
    ]);
  });
