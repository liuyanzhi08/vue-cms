import Koa from 'koa'
import KoaBody from 'koa-body'
import router from './router'
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

app
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(1993)


