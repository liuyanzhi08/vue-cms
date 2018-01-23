import VueRouter from 'vue-router'

import path from 'path'
import { adminRoot } from './config'
import installer from './helper/installer'

var index = () => import(/* webpackChunkName: "index" */ './component/app/user/index.vue')
var list = () => import(/* webpackChunkName: "list" */ './component/app/user/list.vue')
var detail = () => import(/* webpackChunkName: "detail" */ './component/app/user/detail.vue')

var category = () => import(/* webpackChunkName: "category" */ './component/app/admin/category.vue')
var categoryList = () => import(/* webpackChunkName: "category-list" */ './component/app/admin/category-list.vue')
var article = () => import(/* webpackChunkName: "article" */ './component/app/admin/article.vue')
var articleList = () => import(/* webpackChunkName: "article-list" */ './component/app/admin/article-list.vue')
var install = () => import(/* webpackChunkName: "install" */ './component/app/admin/install.vue')

const routes = [
    // admin
    { path: path.join(adminRoot, '/category/:id'), component: category, name: 'category' },
    { path: path.join(adminRoot, '/category'), component: categoryList, name: 'categoryList' },
    { path: path.join(adminRoot, '/article/:id'), component: article, name: 'article' },
    { path: path.join(adminRoot, '/article'), component: articleList, name: 'articleList' },
    { path: path.join(adminRoot, '/install'), component: install, name: 'install' },
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
    var isInInstallPage = to.name === 'install'
    if (isInInstallPage) {
        next()
        return
    }

    var installed = installer.get()
    if (!installed) {
        router.push({ name: 'install'})
    } else {
        next()
    }
})

export default router;
