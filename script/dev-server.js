import e2k from 'express-to-koa';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../src/config';
import spaDevServer from './spa-dev-server';
import ssrDevServer from './ssr-dev-server';

const { ssr } = config;
const devServer = ssr ? ssrDevServer : spaDevServer;

class DevServer {
  constructor(app) {
    this.compileDone = devServer.compileDone;
    this.updateApp(app);
  }

  updateApp(app) {
    this.app = app;
    app.use(e2k(webpackHotMiddleware(devServer.clientCompiler, { heartbeat: 5000 })));
  }
}

export default DevServer;
