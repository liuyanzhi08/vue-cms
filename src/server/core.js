import Koa from 'koa'
import KoaBody from 'koa-body'

import router from './router'

const app = new Koa()

app
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(1991)