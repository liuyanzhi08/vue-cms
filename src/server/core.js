import Koa from 'koa'
import KoaBody from 'koa-body'
import router from './router'
import KoaWebpack from 'koa-webpack'
import Webpack from 'webpack'
import config from '../../webpack.config.js'
import BrowserSync from 'browser-sync'

const compiler = Webpack(config)
const app = new Koa()
const browserSync = BrowserSync.create()

app
    .use(KoaWebpack({
        compiler: compiler
    }))
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(1993)
browserSync.init({
    port: 1991,
    ui: {
        port: 1992
    },
    proxy: 'localhost:1993',
    files: ['**/*']
}, function () {
    console.log('browser refreshed.')
})
