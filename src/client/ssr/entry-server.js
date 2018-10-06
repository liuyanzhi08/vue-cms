import Core from '../core';
import { isDev } from '../helper/env';
import { log } from '../helper/logger';
import error from '../helper/error';
import { API_UPDATE } from '../store';
import config from '../../config';

export default async context => new Promise((resolve, reject) => {
  const { app, router, store } = new Core();

  const start = isDev && Date.now();

  const { url } = context;
  const { fullPath } = router.resolve(url).route;

  if (fullPath !== url) {
    return reject(new Error(error.routerNotFound.info));
  }

  // set router's location
  if (isDev) {
    log(url);
  }
  router.push(url);

  // set uri
  store.dispatch(API_UPDATE, `${config.server.uri}:${config.server.port}`);

  // wait until router has resolved possible async hooks
  router.onReady(() => {
    const matchedComponents = router.getMatchedComponents();
    // no matched routes
    if (!matchedComponents.length) {
      return reject(new Error(error.routerNotFound.info));
    }
    // Call fetchData hooks on components matched by the route.
    // A preFetch hook dispatches a store action and returns a Promise,
    // which is resolved when the action is complete and store state has been
    // updated.
    return Promise.all(matchedComponents.map(({ asyncData }) => {
      if (isDev) {
        log('asyncData:', asyncData);
      }
      const t = asyncData && asyncData({
        store,
        route: router.currentRoute,
      });
      return t;
    })).then(() => {
      if (isDev) {
        log(`data pre-fetch: ${Date.now() - start}ms`);
      }
      // After all preFetch hooks are resolved, our store is now
      // filled with the state needed to render the app.
      // Expose the state on the render context, and let the request handler
      // inline the state in the HTML response. This allows the client-side
      // store to pick-up the server-side state without having to duplicate
      // the initial data fetching on the client.
      context.state = store.state;
      resolve(app);
    }).catch(reject);
  }, reject);
  return app;
});
