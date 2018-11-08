import fse from 'fs-extra';
import $path from 'path';
import config from '../config';
import ctxHelper from '../helper/ctx';
import ssrHelper from '../helper/ssr';
import error from '../helper/error';

const { success, fail } = ctxHelper;
const { createRenderer } = ssrHelper;

const renderArticle = async (ctx, renderer, id) => {
  const ctxClone = Object.assign(ctx);
  const url = `/user/article/${id}`;
  ctxClone.url = url;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(config.dir.static, url, 'index.html');
  fse.outputFile(filename, html);
};

export default {
  post: async (ctx) => {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const data = ctx.request.body;
    const renderer = await createRenderer(ctx.app.$devServer);
    const promises = data.articleIds.map(id => renderArticle(ctx, renderer, id));
    await Promise.all(promises);
    success(ctx, { msg: 'success' });
  },
};
