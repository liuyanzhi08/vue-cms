import ip from 'ip';
import http from 'http';
import webpackHotMiddleware from 'webpack-hot-middleware';
import e2k from 'express-to-koa';
import Core from './core';
import logger from './helper/logger';
import config from './config';
import env from './helper/env';

import setupDevServer from '../../script/setup-dev-server';

const { isDev } = env;

const { log } = logger;
const { server } = config;

const core = new Core();
const { app } = core;
let currentHandler = app.callback();
const webServer = http.createServer();
webServer.on('request', currentHandler);
console.log('tttttt');
webServer.listen(server.port);
log(`cms is running, listening on ${ip.address()}:${server.port}`);

if (isDev) {
  app.$devServer = setupDevServer(app);
  log('[DS] wait for webpack finishes building...');
  app.$devServer.then(() => {
    log('[DS] webpack finished building');
    // opn(`http://${ip.address()}:${server.port}/admin`);
  });
}

if (isDev && module.hot) {
  module.hot.accept('./core.js', () => {
    console.log('----------- update -------------');
    webServer.removeListener('request', currentHandler);
    (async () => {
      const NewCore = (await import('./core')).default;
      const newCore = new NewCore();
      const newApp = newCore.app;
      const newHandler = newApp.callback();
      newApp.$devServer = app.$devServer;
      webServer.on('request', newHandler);
      currentHandler = newHandler;
    })();
  });
}

export default core;
