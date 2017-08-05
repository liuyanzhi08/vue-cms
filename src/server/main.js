import Koa from 'koa'
import KoaRouter from 'koa-router'
import KoaStatic from 'koa-static'
import KoaBody from 'koa-body';

const app = new Koa()

var router = new KoaRouter()

router
    .all('/api/:component/:id', handler)
    .all('/api/:component', handler)

async function handler (ctx) {
    try {
        let component = require('./components/' + ctx.params.component).default
        await component[ctx.method.toLowerCase()](ctx)
    } catch (e) {
        console.log(e);
    }
}

app
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

app.use(KoaStatic(__dirname + '/../client'));
app.use(KoaStatic(__dirname + '/../../dist'));

app.listen(3000)