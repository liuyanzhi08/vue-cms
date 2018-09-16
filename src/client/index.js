import Vue from 'vue';

import './core';
import './component/directive/index';
import router from './router';
import { store } from './store';
import app from './component/app/app';

new Vue({
  components: { app },
  renderError(h, err) {
    return h('pre', { style: { color: 'red' } }, err.stack);
  },
  router,
  store,
}).$mount('#app');
