import fs from 'fs';
import $path from 'path';
import _ from 'lodash';
import faker from 'faker';
import config from '../../../config';
import articleHelper from '../../../helper/article';

const { db, theme } = config;

const categoryTableName = `${db.prefix}_category`;
const articleTableName = `${db.prefix}_article`;

const paths = {
  readme: '../../../../README.md',
  feature: '../../../../doc/01-feature.md',
  develop: '../../../../doc/02-develop.md',
  production: '../../../../doc/03-production.md',
};

const parseDoc = (filePath) => {
  const readmePath = $path.resolve(filePath);
  const file = fs.readFileSync(readmePath).toString();
  const firstLineIndex = file.indexOf('\n');
  const title = _.trim(file.substring(0, firstLineIndex + 1), '#');
  const content = file.substring(firstLineIndex);
  return { title, content };
};

const files = {};
Object.keys(paths).forEach((name) => {
  files[name] = parseDoc(paths[name]);
});

exports.seed = knex => knex(categoryTableName).del()
  .then(() => knex(categoryTableName).insert([
    {
      id: db.rootId,
      title: 'root',
      description: 'root',
      theme,
      parent_id: null,
    },
  ]))
  .then(() => knex(categoryTableName).insert([
    {
      title: 'document',
      description: 'document',
      theme,
      parent_id: db.rootId,
    },
  ]))
  .then((res) => {
    const categoryId = res[0];
    return knex(articleTableName).insert([
      {
        title: files.readme.title,
        content: files.readme.content,
        summary: articleHelper.summary(files.readme.content),
        theme,
        category_id: categoryId,
      },
      {
        title: files.feature.title,
        content: files.feature.content,
        summary: articleHelper.summary(files.readme.content),
        theme,
        category_id: categoryId,
      },
      {
        title: files.develop.title,
        content: files.develop.content,
        summary: articleHelper.summary(files.develop.content),
        theme,
        category_id: categoryId,
      },
      {
        title: files.production.title,
        content: files.production.content,
        summary: articleHelper.summary(files.production.content),
        theme,
        category_id: categoryId,
      },
    ]);
  })
  .then(() => knex(categoryTableName).insert([
    {
      title: 'category-d0-b1',
      description: 'category-d0-b1',
      theme,
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
        theme,
        category_id: res[0],
      },
    ]));
    promises.push(knex(categoryTableName).insert([
      {
        title: 'category-d1-b1',
        description: 'category-d1-b1',
        theme,
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
        theme,
        category_id: res[0],
      },
      {
        title: faker.lorem.sentence(),
        content: contents[1],
        summary: articleHelper.summary(contents[1]),
        theme,
        category_id: res[0],
      },
      {
        title: faker.lorem.sentence(),
        content: contents[2],
        summary: articleHelper.summary(contents[2]),
        theme,
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
        theme,
        category_id: db.rootId,
      },
    ]);
  });
