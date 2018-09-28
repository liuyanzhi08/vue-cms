import config from '../config';

// site info
const name = 'vue-cms';

// path
const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
};

// db
const { db } = config;
db.rootId = 1;

// client config
const rnames = {
  admin: 'admin',
  category: 'category',
  categoryList: 'categoryList',
  article: 'article',
  articleList: 'articleList',
  publish: 'publish',
  login: 'login',
  root: 'root',
  list: 'list',
  detail: 'detail',
};

const menu = [
  {
    label: 'Category',
    name: rnames.categoryList,
  },
];

export {
  path, db, name, rnames, menu,
};

export default path;
