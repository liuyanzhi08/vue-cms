import e2k from 'express-to-koa';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from '../src/config';
import createSpaDevServer from './spa-dev-server';
import createSsrDevServer from './ssr-dev-server';

const { ssr } = config;
const createDevServer = ssr ? createSsrDevServer : createSpaDevServer;

class DevServer {
  constructor(app) {
    const devServer = createDevServer();
    this.devServer = devServer;
    this.compileDone = devServer.compileDone;
    this.updateApp(app);
  }

  updateApp(app) {
    this.app = app;
    app.use(e2k(webpackHotMiddleware(this.devServer.clientCompiler, { heartbeat: 5000 })));
  }
}

export default DevServer;
