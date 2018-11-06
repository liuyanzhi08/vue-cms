import fse from 'fs-extra';
import $path from 'path';
import { dir } from '../config';
import { success, fail } from '../helper/ctx';
import { error } from '../helper/error';
import { createRenderer } from '../helper/ssr';

const renderArticle = async (ctx, renderer, id) => {
  const ctxClone = Object.assign(ctx);
  const url = `/user/article/${id}`;
  ctxClone.url = url;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(dir.static, url, 'index.html');
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
