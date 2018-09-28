import config from '../config';

// site info
const name = 'vue-cms';

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
    icon: 'table',
    router: {
      name: rnames.categoryList,
      params: {},
    },
  },
  {
    icon: 'cloud-upload',
    router: {
      name: rnames.publish,
      params: {},
    },
  },
];

// path
const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
};

// db
const { db } = config;
db.rootId = 1;

export {
  path, db, name, rnames, menu,
};

export default path;
