import KoaRouter from 'koa-router'

var router = new KoaRouter()

router
    .all('/api/:component/:id', handler)
    .all('/api/:component', handler)

async function handler (ctx) {
    try {
        let component = require('./component/' + ctx.params.component).default
        await component[ctx.method.toLowerCase()](ctx)
    } catch (e) {
        console.log(e);
    }
}

export default router