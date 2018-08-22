import VueRouter from 'vue-router'

import path from 'path'
import { adminRoot } from './config'
import installer from './helper/installer'

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

const routes = [
  // admin
  {
    path: adminRoot,
    component: admin,
    name: 'admin',
    children: [
      { path: 'category/:id', component: category, name: 'category' },
      { path: 'category', component: categoryList, name: 'categoryList' },
      { path: 'article/:id', component: article, name: 'article' },
      { path: 'article', component: articleList, name: 'articleList' },
      { path: 'install', component: install, name: 'install' },
      { path: 'staticize', component: staticize, name: 'staticize' },
    ]
  },
  // user
  { path: '/', component: index, name: 'root' },
  { path: '/index', component: index, name: 'index' },
  { path: '/category/:id', component: list, name: 'list' },
  { path: '/article/:id', component: detail, name: 'detail' },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})

router.beforeEach((to, from, next) => {
    const isInInstallPage = to.name === 'install'
    if (isInInstallPage) {
        next()
        return
    }

    const installed = installer.get()
    if (!installed) {
        router.push({ name: 'install', params: { to } })
    } else {
        next()
    }
})

export default router;
