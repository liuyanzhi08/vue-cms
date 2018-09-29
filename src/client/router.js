import VueRouter from 'vue-router';
import { path, rnames } from './config';
import { MENU_HIDE } from './store';

// routes components
const user = () => import(/* webpackChunkName: "user" */ './component/app/admin/user.vue');
const index = () => import(/* webpackChunkName: "index_" */ './component/app/user/index.vue');
const list = () => import(/* webpackChunkName: "list" */ './component/app/user/list.vue');
const detail = () => import(/* webpackChunkName: "detail" */ './component/app/user/detail.vue');

const admin = () => import(/* webpackChunkName: "admin" */ './component/app/admin/admin.vue');
const category = () => import(/* webpackChunkName: "category" */ './component/app/admin/category.vue');
const categoryList = () => import(/* webpackChunkName: "category-list" */ './component/app/admin/category-list.vue');
const article = () => import(/* webpackChunkName: "article" */ './component/app/admin/article.vue');
const articleList = () => import(/* webpackChunkName: "article-list" */ './component/app/admin/article-list.vue');
const publish = () => import(/* webpackChunkName: "publish" */ './component/app/admin/publish.vue');
const login = () => import(/* webpackChunkName: "login" */ './component/app/admin/login.vue');

// routes define
const routes = [
  // admin
  {
    path: path.admin,
    component: admin,
    name: rnames.admin,
    children: [
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
    name: rnames.admin,
    children: [
      {
        path: '',
        component: index,
        name: rnames.root,
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
          params: { to },
        });
      }
      store.dispatch(MENU_HIDE);
      return next();
    });
    return router;
  }
}

export default Router;
