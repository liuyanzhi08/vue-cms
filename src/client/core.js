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

UIkit.use(Icons);

Vue.use(VueResource);
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(ElementUI);
Vue.use(MavonEditor);
Vue.use(UI);
