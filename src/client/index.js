import Vue from 'vue'

import './core'
import './component/directive/index'
import router from './router'
import store from './store'
import app from './component/app/app.vue'

new Vue({
    el: '#app',
    router,
    store,
    components: { app }
})
