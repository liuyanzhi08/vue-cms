import Koa from 'koa';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import session from 'koa-session';
import opn from 'opn';
import ip from 'ip';
import chokidar from 'chokidar';
import path from 'path';
import http from 'http';
import router from './router';
import passport from './passport';
import { log } from './helper/logger';
import { isDev } from './helper/env';
import { ssr, server, dir } from './config';
import spaDevServer from '../../script/spa-dev-server';
import ssrDevServer from '../../script/ssr-dev-server';

const setupDevServer = ssr ? ssrDevServer : spaDevServer;

const createApp = () => {
  const app = new Koa();

  const sessionConfig = {
    maxAge: 60 * 60 * 1000, // expires 60min
  };

  app.keys = ['super-secret-key'];
  app.proxy = true;

  app.use(koaBody())
    .use(koaCompress())
    .use(session(sessionConfig, app))
    .use(passport.initialize())
    .use(passport.session())
    .use(router.routes())
    .use(router.allowedMethods());

  return app;
};

class Server {
  constructor() {
    const app = createApp();
    let currentHandler = app.callback();
    const webServer = http.createServer(currentHandler);
    webServer.listen(server.port);
    log(`cms is running, listening on ${ip.address()}:${server.port}`);

    if (isDev) {
      // setup dev server
      app.$devServer = setupDevServer(app);
      log('[DS] wait for webpack finishes building...');
      app.$devServer.then(() => {
        log('[DS] webpack finished building');
        opn(`http://${ip.address()}:${server.port}/admin`);
      });

      if (module.hot) {
        module.hot.accept('./router', () => {
          console.log('------ reload -----');
          webServer.removeListener('request', currentHandler);
          const newApp = createApp();
          newApp.$devServer = app.$devServer;
          const newHandler = newApp.callback();
          webServer.on('request', newHandler);
          currentHandler = newHandler;
        });
      }

      // watch for files change (back-end only, refresh nodeJS modules cache)
      // const watcher = chokidar.watch(path.join(dir.root, '/src'), { ignored: /client/ });
      // watcher.on('ready', () => {
      //   log('[FW] file watcher ready');
      //   watcher.on('all', (e, p) => {
      //     Object.keys(require.cache).forEach((id) => {
      //       if (/vue-cms\/src/.test(id)) {
      //         // console.log(id)
      //         delete require.cache[id];
      //       }
      //     });
      //     log(`[FW] ${p} ${e}`);
      //   });
      // });
    }

    return app;
  }
}

export default Server;
