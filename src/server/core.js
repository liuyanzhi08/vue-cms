import Koa from 'koa';
import koaBody from 'koa-body';
import koaCompress from 'koa-compress';
import session from 'koa-session';
import router from './router';
import passport from './passport';

class Core {
  constructor() {
    this.createApp();
    return this;
  }

  createApp() {
    this.app = new Koa();
    const { app } = this;

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

    return this.app;
  }
}

export default Core;
