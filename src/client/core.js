import Vue from 'vue';
import VueResource from 'vue-resource';
import * as Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import MavonEditor from 'mavon-editor';
import { sync } from 'vuex-router-sync';

import UI from './component/ui/index';

import Router from './router';
import { Store } from './store';
import App from './component/app/app';
import directive from './component/directive';
import filter from './filter';

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(MavonEditor);
Vue.use(UI);
Vue.use(directive);
Vue.use(filter);

class Core {
  constructor() {
    const store = new Store();
    const router = new Router(store);
    sync(store, router);
    const app = new Vue({
      name: 'App',
      render: h => h(App),
      renderError(h, err) {
        return h('pre', { style: { color: 'red' } }, err.stack);
      },
      router,
      store,
    });
    this.store = store;
    this.router = router;
    this.app = app;
  }
}

export default Core;
