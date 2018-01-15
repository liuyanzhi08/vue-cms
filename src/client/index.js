import Vue from 'vue'

import './core'
import router from './router'
import store from './store'
import app from './component/app/app.vue'
import directive from './component/directive/index'

new Vue({
    el: '#app',
    router,
    store,
    components: { app }
})