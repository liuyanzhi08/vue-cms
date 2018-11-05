import Koa from 'koa';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import session from 'koa-session';
import opn from 'opn';
import ip from 'ip';
import chokidar from 'chokidar';
import path from 'path';
import router from './router';
import passport from './passport';
import { log } from './helper/logger';
import { isDev } from './helper/env';
import { ssr, server, dir } from './config';
import spaDevServer from '../../script/spa-dev-server';
import ssrDevServer from '../../script/ssr-dev-server';

const setupDevServer = ssr ? ssrDevServer : spaDevServer;

class Server {
  constructor() {
    const app = new Koa();

    const sessionConfig = {
      maxAge: 60 * 60 * 1000, // expires 60min
    };

    app.keys = ['super-secret-key'];
    app.proxy = true;

    app.use(koaBody())
      // .use(koaCompress())
      .use(session(sessionConfig, app))
      .use(passport.initialize())
      .use(passport.session())
      .use(router.routes())
      .use(router.allowedMethods());

    app.listen(server.port, '0.0.0.0');
    log(`cms is running, listening on 0.0.0.0:${server.port}`);

    if (isDev) {
      app.$devServer = setupDevServer(app);
      log('[DS] wait for webpack finish building...');
      app.$devServer.then(() => log('[DS] webpack finished building'));
      const watcher = chokidar.watch(path.join(dir.root, '/src'), { ignored: /client/ });
      watcher.on('ready', () => {
        log('[FW] file watcher ready');
        opn(`http://${ip.address()}:${server.port}/admin`);
        watcher.on('all', (e, p) => {
          log(`[FW] ${p} ${e}`);
          Object.keys(require.cache).forEach((id) => {
            if (/vue-cms\/src/.test(id)) {
              delete require.cache[id];
            }
          });
        });
      });
    }

    return app;
  }
}

export default Server;
