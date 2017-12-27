import Vue from 'vue'

import './core.js'
import router from './router.js'
import store from './store.js'
import app from './component/app/app.vue'
new Vue({
    el: '#app',
    router,
    store,
    components: { app }
})