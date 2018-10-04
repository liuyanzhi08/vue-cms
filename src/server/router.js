import KoaRouter from 'koa-router';
import koaSend from 'koa-send';
import path from 'path';
import fs from 'fs';
import { path as _path } from './config';
import { success, fail } from './helper/ctx';

const router = new KoaRouter();

const componentHandler =  async (ctx) => {
  try {
    const component = await import(`./component/${ctx.params.component}`);
    await component.default[ctx.method.toLowerCase()](ctx).catch(e => Promise.reject(e));
  } catch (e) {
    fail(ctx, e);
  }
};

const assetHandler = async (ctx) => {
  const filePath = path.join(_path.dist, ctx.params[0]);
  if (fs.existsSync(filePath)) {
    ctx.set('Cache-Control', `max-age=${3600 * 24 * 7}`);
    await koaSend(ctx, filePath, { root: '/' });
    success(ctx);
  } else {
    ctx.status = 404;
    fail(ctx, { msg: `'${filePath}' not found` }, { code: 404 });
  }
};

const indexHandler = async (ctx) => {
  ctx.set('Cache-Control', 'no-cache');
  await koaSend(ctx, path.join(_path.dist, 'index.html'), { root: '/' });
  success(ctx);
};

const staticHandle = async (ctx) => {
  const param = ctx.params[0];
  const file = param !== '/' ? param : '/index.html';
  const filePath = path.join(_path.static, file);
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
      success(ctx, null, { code: 304 });
    }
  } else {
    fail(ctx, `'${filePath}' not found`, { code: 404 });
  }
};

router
  .all('/api/:component/:id', componentHandler)
  .all('/api/:component', componentHandler)
  .all('/dist/*', assetHandler)
  .all(_path.admin, indexHandler)
  .all(_path.user, indexHandler)
  .all(`${_path.user}/*`, indexHandler)
  .all(`${_path.admin}/*`, indexHandler)
  .all('*', staticHandle);

export default router;
