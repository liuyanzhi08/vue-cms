import Vue from 'vue';
import VueResource from 'vue-resource';
import * as Vuex from 'vuex';
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import MavonEditor from 'mavon-editor';
// eslint-disable-next-line
import '@style/me-theme/index.scss';
// eslint-disable-next-line
import '@style/uk-theme/index.scss';
// eslint-disable-next-line
import '@style/el-theme/index.scss';

import 'font-awesome/scss/font-awesome.scss';
import UI from './component/ui/index';

import Router from './router';
import { Store } from './store';
import app from './component/app/app';
import directive from './component/directive';
import filter from './filter';

UIkit.use(Icons);

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(MavonEditor);
Vue.use(UI);
Vue.use(directive);
Vue.use(filter);

const store = new Store();
const router = new Router(store);

class App {
  constructor() {
    return new Vue({
      components: { app },
      renderError(h, err) {
        return h('pre', { style: { color: 'red' } }, err.stack);
      },
      router,
      store,
    }).$mount('#app');
  }
}

export default App;
