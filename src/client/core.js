import Vue from 'vue';
import VueResource from 'vue-resource';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import 'bootstrap';
import 'bootstrap/scss/bootstrap.scss';
import 'font-awesome/scss/font-awesome.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Ui from './component/ui/index';

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Ui);
