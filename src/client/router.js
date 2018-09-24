import VueRouter from 'vue-router';
import { path } from './config';
import { MENU_HIDE, store } from './store';

const user = () => import(/* webpackChunkName: "user" */ './component/app/admin/user.vue');
const index = () => import(/* webpackChunkName: "index_" */ './component/app/user/index.vue');
const list = () => import(/* webpackChunkName: "list" */ './component/app/user/list.vue');
const detail = () => import(/* webpackChunkName: "detail" */ './component/app/user/detail.vue');

const admin = () => import(/* webpackChunkName: "admin" */ './component/app/admin/admin.vue');
const category = () => import(/* webpackChunkName: "category" */ './component/app/admin/category.vue');
const categoryList = () => import(/* webpackChunkName: "category-list" */ './component/app/admin/category-list.vue');
const article = () => import(/* webpackChunkName: "article" */ './component/app/admin/article.vue');
const articleList = () => import(/* webpackChunkName: "article-list" */ './component/app/admin/article-list.vue');
const staticize = () => import(/* webpackChunkName: "staticize" */ './component/app/admin/staticize.vue');
const login = () => import(/* webpackChunkName: "login" */ './component/app/admin/login.vue');

const routes = [
  // admin
  {
    path: path.admin,
    component: admin,
    name: 'admin',
    children: [
      {
        path: 'category/:id',
        component: category,
        name: 'category',
        meta: {
          auth: true,
        },
      },
      {
        path: 'category',
        component: categoryList,
        name: 'categoryList',
        alias: '',
        meta: {
          auth: true,
        },
      },
      {
        path: 'article/:id',
        component: article,
        name: 'article',
        meta: {
          auth: true,
        },
      },
      {
        path: 'article',
        component: articleList,
        name: 'articleList',
        meta: {
          auth: true,
        },
      },
      {
        path: 'staticize',
        component: staticize,
        name: 'staticize',
        meta: {
          auth: true,
        },
      },
      {
        path: 'login',
        component: login,
        name: 'login',
      },
    ],
  },
  // user
  {
    path: path.user,
    component: user,
    name: 'admin',
    children: [
      {
        path: '',
        component: index,
        name: 'root',
        alias: 'index',
      },
      {
        path: 'category/:id',
        component: list,
        name: 'list',
      },
      {
        path: 'article/:id',
        component: detail,
        name: 'detail',
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

router.beforeEach((to, from, next) => {
  const { isAuthenticated } = store.getters;
  const isAuthRoute = to.meta && to.meta.auth;
  if (isAuthRoute && !isAuthenticated) {
    return router.push({
      name: 'login',
      params: { to },
    });
  }
  store.dispatch(MENU_HIDE);
  return next();
});

export default router;
