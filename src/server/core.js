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
import config from './config';
import spaDevServer from '../../script/spa-dev-server';
import ssrDevServer from '../../script/ssr-dev-server';

const { ssr, server, dir } = config;
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
        // opn(`http://${ip.address()}:${server.port}/admin`);
      });

      let context = require.context('./', false, /\.js$/);

      if (module.hot) {
        console.log(context.keys());
        // module.hot.accept(['./config'], () => {
        //   context = require.context('./', false, /\.js$/)
        //   console.log('------ reload -----');
        //   webServer.removeListener('request', currentHandler);
        //   const newApp = createApp();
        //   newApp.$devServer = app.$devServer;
        //   const newHandler = newApp.callback();
        //   webServer.on('request', newHandler);
        //   currentHandler = newHandler;
        // });
        module.hot.accept();
        console.log('----- reload -------');

        // const customReloadLogic = (name, module, isReload) => {
        //   console.log('module ' + name + (isReload ? ' re' : '') + 'loaded');
        // };
        //
        // const modules = {};
        // context.keys().forEach((key) => {
        //   const module = context(key);
        //   modules[key] = module;
        // });
        //
        // console.log(context.keys(), context.id);
        //
        // if (module.hot) {
        //   module.hot.accept('./router', () => {
        //     console.log('======= reoad =========');
        //     return;
        //     // You can't use context here. You _need_ to call require.context again to
        //     // get the new version. Otherwise you might get errors about using disposed
        //     // modules
        //     const reloadedContext = require.context('./', false, /\.js$/);
        //     // To find out what module was changed you just compare the result of the
        //     // require call with the version stored in the modules hash using strict
        //     // equality. Equal means it is unchanged.
        //     console.log(reloadedContext.keys());
        //     const changedModules = reloadedContext.keys()
        //       .map(key => [key, reloadedContext(key)])
        //       .filter(reloadedModule => {
        //         console.log(reloadedModule, reloadedModule[0], reloadedModule[1]);
        //         modules[reloadedModule[0]] !== reloadedModule[1];
        //       });
        //     changedModules.forEach((module) => {
        //       // eslint-disable-next-line
        //       modules[module[0]] = module[1];
        //       customReloadLogic(module[0], module[1], true);
        //     });
        //   });
        // }
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
