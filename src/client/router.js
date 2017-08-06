import VueRouter from 'vue-router'
import article from './components/article.vue'
import articleList from './components/article-list.vue'

const routes = [
    { path: '/article/:id', component: article },
    { path: '/article', component: articleList },
]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

export default router;
