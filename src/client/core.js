import Vue from 'vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import Ui from './component/ui/index'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Ui)
var Directive = require('./component/directive/index')
console.log(Directive.default)
Vue.use(Directive.default)
