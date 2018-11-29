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

    // if (isDev) {
    //   setup dev server
    //   app.$devServer = setupDevServer(app);
    //   log('[DS] wait for webpack finishes building...');
    //   app.$devServer.then(() => {
    //     log('[DS] webpack finished building');
    //     // opn(`http://${ip.address()}:${server.port}/admin`);
    //   });
    //
    //
    //   watch for files change (back-end only, refresh nodeJS modules cache)
    //   const watcher = chokidar.watch(path.join(dir.root, '/src'), { ignored: /client/ });
    //   watcher.on('ready', () => {
    //     log('[FW] file watcher ready');
    //     watcher.on('all', (e, p) => {
    //       Object.keys(require.cache).forEach((id) => {
    //         if (/vue-cms\/src/.test(id)) {
    //           // console.log(id)
    //           delete require.cache[id];
    //         }
    //       });
    //       log(`[FW] ${p} ${e}`);
    //     });
    //   });
    // }

    return this.app;
  }
}

export default Core;
