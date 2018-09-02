import Koa from 'koa';
import KoaBody from 'koa-body';
import session from 'koa-session';

import router from './router';
import passport from './passport';

// import KoaWebpack from 'koa-webpack'
// import Webpack from 'webpack'
// import config from '../../webpack.config.js'

// const compiler = Webpack(config)
const app = new Koa()
// const isDev = process.env.NODE_ENV !== 'production'

// if (isDev) {
//     app.use(KoaWebpack({
//         compiler: compiler
//     }))
// }

app.keys = ['super-secret-key'];

app.use(KoaBody())
  .use(session(app))
  .use(passport.initialize())
  .use(passport.session())
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(1993, '0.0.0.0')
console.log('cms is running, listening on 0.0.0.0:1993');
