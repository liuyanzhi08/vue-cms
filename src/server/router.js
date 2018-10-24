import KoaRouter from 'koa-router';
import koaSend from 'koa-send';
import $path from 'path';
import fs from 'fs';
import { createBundleRenderer } from 'vue-server-renderer';
import { path, dir, ssr } from './config';
import { success, fail } from './helper/ctx';
import { isDev } from './helper/env';

const router = new KoaRouter();

const componentHandler = async (ctx) => {
  try {
    const component = await import(`./component/${ctx.params.component}`);
    await component.default[ctx.method.toLowerCase()](ctx).catch(e => Promise.reject(e));
  } catch (e) {
    fail(ctx, e);
  }
};

const assetHandler = async (ctx) => {
  if (isDev) {
    const { readClientFile } = await ctx.app.$devServer;
    success(ctx, readClientFile(ctx.params[0]));
  } else {
    const filePath = $path.join(dir.dist, ctx.params[0]);
    if (fs.existsSync(filePath)) {
      ctx.set('Cache-Control', `max-age=${3600 * 24 * 7}`);
      await koaSend(ctx, filePath, { root: '/' });
      success(ctx);
    } else {
      ctx.status = 404;
      fail(ctx, { msg: `'${filePath}' not found` }, { code: 404 });
    }
  }
};

const templatePath = $path.join(dir.root, 'src/server/ssr/template.html');
const template = fs.readFileSync(templatePath, 'utf-8');

const indexHandler = async (ctx) => {
  ctx.set('Cache-Control', 'no-cache');
  if (!ssr) {
    if (isDev) {
      const { readClientFile } = await ctx.app.$devServer;
      success(ctx, readClientFile('index.html'));
    } else {
      await koaSend(ctx, $path.join(dir.dist, 'index.html'), { root: '/' });
      success(ctx);
    }
  } else {
    let serverManifest;
    let clientManifest;
    if (isDev) {
      // In development: setup the dev server with watch and hot-reload,
      // and create a new renderer on bundle / index template update.
      const { readClientFile, readServerFile } = await ctx.app.$devServer;
      clientManifest = JSON.parse(readClientFile('manifest/vue-ssr-client-bundle.json'));
      serverManifest = JSON.parse(readServerFile('manifest/vue-ssr-server-bundle.json'));
    } else {
      clientManifest = await import('../../dist/manifest/vue-ssr-client-bundle');
      serverManifest = await import('../../dist/manifest/vue-ssr-server-bundle');
    }
    const options = {
      clientManifest,
      template,
      // this is only needed when vue-server-renderer is npm-linked
      basedir: dir.dist,
      // recommended for performance
      runInNewContext: false,
    };
    const renderer = createBundleRenderer(serverManifest, options);
    const html = await renderer.renderToString(ctx);
    success(ctx, html);
  }
};

const staticHandle = async (ctx) => {
  const param = ctx.params[0];
  const filePath = $path.join(dir.static, path.user, param, 'index.html');
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
  .all(path.admin, indexHandler)
  .all(path.user, indexHandler)
  .all(`${path.user}/*`, indexHandler)
  .all(`${path.admin}/*`, indexHandler)
  // .all('*', staticHandle);

export default router;
