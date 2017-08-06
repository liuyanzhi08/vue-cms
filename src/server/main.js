import Koa from 'koa'
import KoaStatic from 'koa-static'
import KoaBody from 'koa-body'

import router from './router'

const app = new Koa()

app
    .use(KoaBody())
    .use(router.routes())
    .use(router.allowedMethods())

app.use(KoaStatic(__dirname + '/../client'))
app.use(KoaStatic(__dirname + '/../../dist'))

app.listen(3000)