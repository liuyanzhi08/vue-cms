import Vue from 'vue';
import VueResource from 'vue-resource';
import * as Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import MavonEditor from 'mavon-editor';
import Viewer from 'v-viewer';
import { sync } from 'vuex-router-sync';
import UI from './component/ui/index';
import Router from './router';
import { Store } from './store';
import App from './component/app/app';
import directive from './component/directive';
import filter from './filter';

Vue.mixin({
  data() {
    return {
      isClient: process.client === true,
    };
  },
});

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(MavonEditor);
Vue.use(Viewer);
Vue.use(UI);
Vue.use(directive);
Vue.use(filter);

class Core {
  constructor() {
    const store = new Store();
    const router = new Router(store);
    sync(store, router);
    this.store = store;
    this.router = router;
  }

  createApp() {
    this.app = new Vue({
      name: 'App',
      render: h => h(App),
      renderError(h, err) {
        return h('pre', { style: { color: 'red' } }, err.stack);
      },
      router: this.router,
      store: this.store,
    });
    return this.app;
  }
}

export default Core;
