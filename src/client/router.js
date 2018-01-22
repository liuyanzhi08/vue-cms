import VueRouter from 'vue-router'

import index from './component/app/user/index.vue'
import list from './component/app/user/list.vue'
import detail from './component/app/user/detail.vue'

import category from './component/app/admin/category.vue'
import categoryList from './component/app/admin/category-list.vue'
import article from './component/app/admin/article.vue'
import articleList from './component/app/admin/article-list.vue'
import install from './component/app/admin/install.vue'

import path from 'path'
import { adminRoot } from './config'
import installer from './helper/installer'

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
