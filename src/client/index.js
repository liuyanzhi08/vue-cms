import Vue from 'vue'

import './core'
import router from './router'
import store from './store'

import './index.scss'

const app = new Vue({
    el: '#app',
    router,
    store
})