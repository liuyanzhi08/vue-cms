import Vue from 'vue';
import Cookie from 'js-cookie';
import Core from '../core';
import { API_SET, AUTH_USER, AUTH_USER_ID } from '../store';
import { isDev } from "../helper/env";
import { log } from "../helper/logger";

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  // beforeMount() {
  //   const { asyncData } = this.$options;
  //   console.log(asyncData)
  //   if (asyncData) {
  //     // 将获取数据操作分配给 promise
  //     // 以便在组件中，我们可以在数据准备就绪后
  //     // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
  //     this.dataPromise = asyncData({
  //       store: this.$store,
  //       route: this.$route,
  //     }).then((res) => {
  //       console.log(this.$store, res);
  //     });
  //   }
  // },
});

const core = new Core();
const { router, store } = core;

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* eslint-disable */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
} else {
  // for spa
  const userId = Cookie.get(AUTH_USER);
  if (userId) {
    store.commit(AUTH_USER_ID, userId);
  }
}

// set uri
store.dispatch(API_SET, '');

const app = core.createApp();

// Using router.beforeResolve() so that all async components are resolved.
router.beforeResolve((to, from, next) => {
  window.scrollTo(0, 0);
  const matched = router.getMatchedComponents(to);
  const asyncDataHooks = matched.map(c => c.asyncData).filter(_ => !!_);
  if (!asyncDataHooks.length) {
    return next();
  }
  return Promise.all(asyncDataHooks.map(hook => hook({
    store,
    route: to,
  })))
    .then(() => {
      next();
    })
    .catch(next);
});

router.onReady(() => {
  // actually mount to DOM
  app.$mount('#app');
});

export default app;
