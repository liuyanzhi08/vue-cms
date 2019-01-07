import ip from 'ip';
import Core from '../core';
import { isDev } from '../helper/env';
import { log, err } from '../helper/logger';
import error from '../helper/error';
import {
  API_SET, AUTH_USER, AUTH_USER_ID, APP_SET_PUBLISH,
} from '../store';
import config from '../../config';

export default async ctx => new Promise((resolve, reject) => {
  const core = new Core();
  const { router, store } = core;

  const start = isDev && Date.now();

  const { url, $publish } = ctx;

  const { fullPath } = router.resolve(url).route;

  if (fullPath !== url) {
    return reject(new Error(error.routerNotFound.info));
  }

  // set uri
  store.dispatch(API_SET, `http://${ip.address()}:${config.server.port}`);

  // set if publish: generating static HTML
  store.dispatch(APP_SET_PUBLISH, $publish);

  // set auth
  const userId = ctx.cookies.get(AUTH_USER);
  if (userId) {
    store.commit(AUTH_USER_ID, userId);
  }

  const app = core.createApp();

  // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes
    if (!matchedComponents.length) {
      return reject(new Error(error.routerNotFound.info));
    }

    return Promise.all(matchedComponents.map(({ asyncData }) => {
      const t = asyncData && asyncData({
        store,
        route: router.currentRoute,
      });
      return t;
    })).then(() => {
      if (isDev) {
        log(`ssr: data pre-fetch: ${Date.now() - start}ms`);
      }
      ctx.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);

  // set router's location
  if (isDev) {
    log(url);
  }
  router.push(url);

  return app;
});
