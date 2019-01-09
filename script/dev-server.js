import e2k from 'express-to-koa';
import webpackHotMiddleware from 'webpack-hot-middleware';
import createDevServer from './ssr-dev-server';

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
