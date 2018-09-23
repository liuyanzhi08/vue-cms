import Vue from 'vue';
import VueResource from 'vue-resource';
import * as Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import UIkit from 'uikit';
// eslint-disable-next-line
import '@style/uk-theme/index.scss';
import Icons from 'uikit/dist/js/uikit-icons';
import 'font-awesome/scss/font-awesome.scss';
import 'element-ui/lib/theme-chalk/index.css';
import Ui from './component/ui/index';

UIkit.use(Icons);

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(Ui);
