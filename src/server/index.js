import ip from 'ip';
import http from 'http';
import opn from 'opn';
import Core from './core';
import logger from './helper/logger';
import config from './config';
import env from './helper/env';

import DevServer from '../../script/dev-server';

const { isDev } = env;
const { log } = logger;
const { server } = config;

const core = new Core();
const { app } = core;
let currentHandler = app.callback();
const webServer = http.createServer();
webServer.on('request', currentHandler);
webServer.listen(server.port);
log(`Koa is running, listening on ${ip.address()}:${server.port}`);

if (isDev) {
  const devServer = new DevServer(app);
  app.$devServer = devServer;
  log(`[DS] running in ${config.ssr ? 'SSR' : 'SPA'} mode`);
  log('[DS] waiting for webpack finishes building...');
  app.$devServer.compileDone.then(() => {
    log('[DS] webpack finished building');
    opn(`http://${ip.address()}:${server.port}/admin`);
  });
}

if (isDev && module.hot) {
  module.hot.accept('./core.js', async () => {
    log('[DS] http server has updated with new Koa handler');
    webServer.removeListener('request', currentHandler);
    const NewCore = (await import('./core')).default;
    const newCore = new NewCore();
    const newApp = newCore.app;
    const newHandler = newApp.callback();
    app.$devServer.updateApp(newApp);
    newApp.$devServer = app.$devServer;
    webServer.on('request', newHandler);
    currentHandler = newHandler;
  });

  module.hot.accept('../../script/dev-server', async () => {
    const devServer = new DevServer(app);
    app.$devServer = devServer;
    const newConfig = (await import('./config')).default;
    log(`[DS] change to ${newConfig.ssr ? 'SSR' : 'SPA'} mode`);
    log('[DS] waiting for webpack finishes building...');
    app.$devServer.compileDone.then(() => {
      log('[DS] webpack finished building');
      // opn(`http://${ip.address()}:${server.port}/admin`);
    });
  });
}

export default core;
