import Vue from 'vue';
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import article from './components/article.vue'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [
    { path: '/article/:id', component: article },
]

const router = new VueRouter({
    routes // （缩写）相当于 routes: routes
})

const app = new Vue({
    router
}).$mount('#app')

// 现在，应用已经启动了！