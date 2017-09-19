import VueRouter from 'vue-router'
import index from './component/app/index.vue'
import article from './component/app/article.vue'
import articleList from './component/app/article-list.vue'

const routes = [
    { path: '/', component: index, name: 'root' },
    { path: '/index', component: index, name: 'index' },
    { path: '/article/:id', component: article, name: 'article' },
    { path: '/article', component: articleList, name: 'articleList' }
]

const router = new VueRouter({
    mode: 'history',
    routes, // （缩写）相当于 routes: routes
})

export default router;
