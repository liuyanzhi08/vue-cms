import Vue from 'vue';
import Core from './core';
import { API_UPDATE } from './store';
import config from '../config';

// a global mixin that calls `asyncData` when a route component's params change
Vue.mixin({
  beforeRouteUpdate(to, from, next) {
    const { asyncData } = this.$options;
    if (asyncData) {
      asyncData({
        store: this.$store,
        route: to,
      }).then(next).catch(next);
    } else {
      next();
    }
  },
  beforeMount() {
    const { asyncData } = this.$options;
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store,
        route: this.$route,
      });
    }
  },
});

const { app, router, store } = new Core();

// set uri
store.dispatch(API_UPDATE, '');

// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
/* eslint-disable */
if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__);
}
/* eslint-enable */

// wait until router has resolved all async before hooks
// and async components...
router.onReady(() => {
  // Add router hook for handling asyncData.
  // Doing it after initial route is resolved so that we don't double-fetch
  // the data that we already have. Using router.beforeResolve() so that all
  // async components are resolved.
  router.beforeResolve((to, from, next) => {
    const matched = router.getMatchedComponents(to);
    const prevMatched = router.getMatchedComponents(from);
    let diffed = false;
    const activated = matched.filter((c, i) => {
      if (!diffed) {
        diffed = (prevMatched[i] !== c);
      }
      return diffed;
    });
    const asyncDataHooks = activated.map(c => c.asyncData).filter(_ => !!_);
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

  // actually mount to DOM
  app.$mount('#app');
});

export default app;
