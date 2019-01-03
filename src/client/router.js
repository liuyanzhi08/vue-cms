import VueRouter from 'vue-router';
import config from './config';
import { MENU_HIDE } from './store';

const { path, rnames } = config;

// routes components
const user = () => import(/* webpackChunkName: "user" */ './component/app/admin/user');
const index = () => import(/* webpackChunkName: "index_" */ './component/app/user/index');
const list = () => import(/* webpackChunkName: "list" */ './component/app/user/list');
const detail = () => import(/* webpackChunkName: "detail" */ './component/app/user/detail');

const admin = () => import(/* webpackChunkName: "admin" */ './component/app/admin/admin');
const common = () => import(/* webpackChunkName: "common" */ './component/app/admin/common');
const category = () => import(/* webpackChunkName: "category" */ './component/app/admin/category');
const categoryList = () => import(/* webpackChunkName: "category-list" */ './component/app/admin/category-list');
const article = () => import(/* webpackChunkName: "article" */ './component/app/admin/article');
const articleList = () => import(/* webpackChunkName: "article-list" */ './component/app/admin/article-list');
const publish = () => import(/* webpackChunkName: "publish" */ './component/app/admin/publish');
const login = () => import(/* webpackChunkName: "login" */ './component/app/admin/login');

// routes define
const routes = [
  // admin
  {
    path: path.admin,
    component: admin,
    children: [
      {
        path: 'common',
        component: common,
        name: rnames.common,
        meta: {
          auth: true,
        },
      },
      {
        path: 'category/:id',
        component: category,
        name: rnames.category,
        meta: {
          auth: true,
        },
      },
      {
        path: 'category',
        component: categoryList,
        name: rnames.categoryList,
        alias: '',
        meta: {
          auth: true,
        },
      },
      {
        path: 'article/:id',
        component: article,
        name: rnames.article,
        meta: {
          auth: true,
        },
      },
      {
        path: 'article',
        component: articleList,
        name: rnames.articleList,
        meta: {
          auth: true,
        },
      },
      {
        path: 'publish',
        component: publish,
        name: rnames.publish,
        meta: {
          auth: true,
        },
      },
      {
        path: 'login',
        component: login,
        name: rnames.login,
      },
    ],
  },
  // user
  {
    path: path.user,
    component: user,
    alias: '',
    children: [
      {
        path: '',
        component: index,
        name: rnames.index,
        alias: 'index',
      },
      {
        path: 'category/:id',
        component: list,
        name: rnames.list,
      },
      {
        path: 'article/:id',
        component: detail,
        name: rnames.detail,
      },
    ],
  },
];

class Router {
  constructor(store) {
    const router = new VueRouter({
      mode: 'history',
      routes,
    });
    router.beforeEach((to, from, next) => {
      const { isAuthenticated } = store.getters;
      const isAuthRoute = to.meta && to.meta.auth;
      if (isAuthRoute && !isAuthenticated) {
        return router.push({
          name: rnames.login,
        });
      }
      store.dispatch(MENU_HIDE);
      return next();
    });
    return router;
  }
}

export default Router;
