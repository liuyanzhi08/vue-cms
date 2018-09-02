import VueRouter from 'vue-router'
import axios from 'axios';

import path from 'path'
import {adminRoot} from './config'
import installer from './helper/installer'
import store from './store';
import { AUTH_LOGIN } from "./store";

const index = () => import(/* webpackChunkName: "index_" */ './component/app/user/index.vue')
const list = () => import(/* webpackChunkName: "list" */ './component/app/user/list.vue')
const detail = () => import(/* webpackChunkName: "detail" */ './component/app/user/detail.vue')

const admin = () => import(/* webpackChunkName: "admin" */ './component/app/admin/admin.vue')
const category = () => import(/* webpackChunkName: "category" */ './component/app/admin/category.vue')
const categoryList = () => import(/* webpackChunkName: "category-list" */ './component/app/admin/category-list.vue')
const article = () => import(/* webpackChunkName: "article" */ './component/app/admin/article.vue')
const articleList = () => import(/* webpackChunkName: "article-list" */ './component/app/admin/article-list.vue')
const install = () => import(/* webpackChunkName: "install" */ './component/app/admin/install.vue')
const staticize = () => import(/* webpackChunkName: "staticize" */ './component/app/admin/staticize.vue')
const login = () => import(/* webpackChunkName: "login" */ './component/app/admin/login.vue')


const routes = [
  // admin
  {
    path: adminRoot,
    component: admin,
    name: 'admin',
    children: [
      {path: 'category/:id', component: category, name: 'category'},
      {path: 'category', component: categoryList, name: 'categoryList'},
      {path: 'article/:id', component: article, name: 'article'},
      {path: 'article', component: articleList, name: 'articleList'},
      {path: 'install', component: install, name: 'install'},
      {path: 'staticize', component: staticize, name: 'staticize'},
      {path: 'login', component: login, name: 'login'},
    ]
  },
  // user
  {path: '/', component: index, name: 'root'},
  {path: '/index', component: index, name: 'index'},
  {path: '/category/:id', component: list, name: 'list'},
  {path: '/article/:id', component: detail, name: 'detail'},
]

const router = new VueRouter({
  mode: 'history',
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.getters.isAuthenticated) {
    return router.push({name: 'login', params: {to}});
  }
  const isInInstallPage = to.name === 'install'
  if (isInInstallPage) {
    next()
    return
  }

  const installed = installer.get()
  if (!installed) {
    router.push({name: 'install', params: {to}})
  } else {
    next()
  }
});

axios.interceptors.request.use(function (config) {
  console.log(config)
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export default router;
