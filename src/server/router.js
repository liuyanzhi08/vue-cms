import KoaRouter from 'koa-router'
import KoaSend from 'koa-send'
import path from 'path'
import fs from 'fs';
import {adminRoot, userRoot} from "../client/config";
import log from  './helper/log';

var router = new KoaRouter()

router
  .all('/api/:component/:id', componentHandler)
  .all('/api/:component', componentHandler)
  .all('/dist/*', assetHandler)
  .all(adminRoot, indexHandler)
  .all(userRoot, indexHandler)
  .all(`${userRoot}/*`, indexHandler)
  .all(`${adminRoot}/*`, indexHandler)
  .all('*', staticHandle)

async function componentHandler(ctx) {
  try {
    let component = require('./component/' + ctx.params.component).default
    await component[ctx.method.toLowerCase()](ctx)
  } catch (e) {
    console.warn(e);
  }
  log(ctx.url);
}

async function assetHandler(ctx) {
  await KoaSend(ctx, path.join('dist/', ctx.params[0]));
  log(ctx.url);
}

async function indexHandler(ctx) {
  await KoaSend(ctx, 'dist/index.html');
  log(ctx.url);
}

async function staticHandle(ctx) {
  const param = ctx.params[0];
  const file = param !== '/' ? param : '/index.html';
  const filePath = path.join('dist/static', file);
  if (fs.existsSync(filePath)) {
    await KoaSend(ctx, path.join('dist/static', file));
  } else {
    ctx.status = 404;
  };
  log(ctx.url);
}

export default router
