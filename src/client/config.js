import config from '../config';

// client config
const rnames = {
  admin: 'admin',
  category: 'category',
  categoryList: 'categoryList',
  article: 'article',
  articleList: 'articleList',
  publish: 'publish',
  login: 'login',
  index: 'index',
  list: 'list',
  detail: 'detail',
  user: 'user',
  common: 'common',
  search: 'search',
  plugin: 'plugin',
};

// site info
const brand = {
  name: 'vue-cms',
  router: {
    name: rnames.categoryList,
  },
};

const menu = [
  {
    label: 'Category',
    icon: 'list',
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
  {
    label: 'Common',
    icon: 'cog',
    router: {
      name: rnames.common,
      params: {},
    },
  },
  {
    label: 'Plugin',
    icon: 'settings',
    router: {
      name: rnames.plugin,
      params: {},
    },
  },
];

// path
const path = {
  user: config.server.path.user,
  admin: config.server.path.admin,
  upload: config.server.path.upload,
};

// db
const { db } = config;
db.rootId = 1;

// theme
const { theme } = config;

// pager
const pagination = {
  page: 1,
  num: 20,
};

export default {
  path, db, brand, rnames, menu, theme, pagination,
};
