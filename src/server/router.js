import KoaRouter from 'koa-router';
import koaSend from 'koa-send';
import _path from 'path';
import fs from 'fs';
import { path } from './config';
import { log as _log, err } from './helper/logger';

const router = new KoaRouter();

const log = ctx => _log(`${ctx.method} ${ctx.url} @${ctx.ip}`);

const componentHandler = async (ctx) => {
  try {
    const component = await import(`./component/${ctx.params.component}`);
    await component.default[ctx.method.toLowerCase()](ctx);
  } catch (e) {
    err(e);
  }
  log(ctx);
};

const assetHandler = async (ctx) => {
  const filePath = _path.join(path.dist, ctx.params[0]);
  if (fs.existsSync(filePath)) {
    ctx.set('Cache-Control', `max-age=${3600 * 24 * 7}`);
    await koaSend(ctx, filePath, { root: '/' });
  } else {
    ctx.status = 404;
  }
  log(ctx);
};

const indexHandler = async (ctx) => {
  ctx.set('Cache-Control', 'no-cache');
  await koaSend(ctx, _path.join(path.dist, 'index.html'), { root: '/' });
  log(ctx);
};

const staticHandle = async (ctx) => {
  const param = ctx.params[0];
  const file = param !== '/' ? param : '/index.html';
  const filePath = _path.join(path.static, file);
  if (fs.existsSync(filePath)) {
    const stats = fs.statSync(filePath);
    const fileModified = new Date(stats.ctime);
    fileModified.setMilliseconds(0);
    // compare file writing time and the request header['if-modified-since']
    let isModified;
    const lastModifiedStr = ctx.headers['if-modified-since'];
    if (!lastModifiedStr) {
      isModified = true;
    } else {
      const lastModified = new Date(lastModifiedStr);
      if (lastModified.getTime() !== fileModified.getTime()) {
        isModified = true;
      } else {
        isModified = false;
      }
    }
    if (isModified) {
      ctx.lastModified = fileModified;
      await koaSend(ctx, filePath, { root: '/' });
    } else {
      ctx.status = 304;
    }
  } else {
    ctx.status = 404;
  }
  log(ctx);
};

router
  .all('/api/:component/:id', componentHandler)
  .all('/api/:component', componentHandler)
  .all('/dist/*', assetHandler)
  .all(path.admin, indexHandler)
  .all(path.user, indexHandler)
  .all(`${path.user}/*`, indexHandler)
  .all(`${path.admin}/*`, indexHandler)
  .all('*', staticHandle);

export default router;
