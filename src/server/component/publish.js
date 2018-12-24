import fse from 'fs-extra';
import $path from 'path';
import config from '../config';
import ctxHelper from '../helper/ctx';
import ssrHelper from '../helper/ssr';
import error from '../helper/error';
import env from '../helper/env';

const { success, fail } = ctxHelper;
const { createRenderer } = ssrHelper;
const { isDev } = env;

const renderArticle = async (ctx, renderer, id) => {
  const ctxClone = Object.assign(ctx);
  const url = `/user/article/${id}`;
  ctxClone.url = url;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(config.dir.static, url, 'index.html');
  fse.outputFile(filename, html);
};

const renderIndex = async (ctx, renderer) => {
  const ctxClone = Object.assign(ctx);
  const url = '/user';
  ctxClone.url = url;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(config.dir.static, url, 'index.html');
  console.log(filename)
  fse.outputFile(filename, html);
};

export default {
  post: async (ctx) => {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const data = ctx.request.body;
    const renderer = await createRenderer(isDev && ctx.app.$devServer);
    const promises = data.articleIds.map(id => renderArticle(ctx, renderer, id));
    if (data.includeIndex) {
      promises.push(renderIndex(ctx, renderer));
    }
    await Promise.all(promises);
    success(ctx, { msg: 'success' });
  },
};
