import KoaRouter from 'koa-router'
import KoaSend from 'koa-send'
import path from 'path'

var router = new KoaRouter()

router
    .all('/api/:component/:id', componentHandler)
    .all('/api/:component', componentHandler)
    .all('/dist/client/*', assetHandler)
    .all('*', indexHandler)

async function componentHandler (ctx) {
    try {
        let component = require('./component/' + ctx.params.component).default
        await component[ctx.method.toLowerCase()](ctx)
    } catch (e) {
        console.log(e);
    }
}

async function assetHandler (ctx) {
    await KoaSend(ctx, path.join('dist/client', ctx.params[0]))
}``

async function indexHandler (ctx) {
    await KoaSend(ctx, 'src/client/index.html')
}

export default router