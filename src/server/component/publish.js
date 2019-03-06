import fse from 'fs-extra';
import $path from 'path';
import config from '../config';
import ctxHelper from '../helper/ctx';
import ssrHelper from '../helper/ssr';
import error from '../helper/error';
import env from '../helper/env';
import article from '../models/article';
import util from '../util';

const { success, fail } = ctxHelper;
const { createRenderer } = ssrHelper;
const { isDev } = env;
const { pagination } = config;

const renderArticle = async (ctx, renderer, id) => {
  const ctxClone = Object.assign(ctx);
  const url = `/user/article/${id}`;
  ctxClone.url = url;
  ctxClone.$publish = true;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(config.dir.static, url, 'index.html');
  fse.outputFile(filename, html);
};

const renderCategory = async (ctx, id) => {
  const total = await article.getTotal(id);
  const { num } = pagination;
  const pages = [];
  let currentPage = 1;
  do {
    pages.push(currentPage);
    currentPage += 1;
  } while ((currentPage - 1) * num < total);

  await util.asyncForEach(pages, async (page) => {
    const ctxClone = Object.assign(ctx);
    const url = `/user/category/${id}?_page=${page}&_num=${num}`;
    ctxClone.url = url;
    ctxClone.$publish = true;
    const renderer = await createRenderer(isDev && ctx.app.$devServer);
    const html = await renderer.renderToString(ctxClone);
    const filename = $path.join(config.dir.static, url, 'index.html');
    fse.outputFile(filename, html);
    if (page === 1) {
      fse.outputFile($path.join(config.dir.static, `/user/category/${id}`, 'index.html'), html);
    }
  });
};

const renderIndex = async (ctx, renderer) => {
  const ctxClone = Object.assign(ctx);
  const url = '/user';
  ctxClone.url = url;
  ctxClone.$publish = true;
  const html = await renderer.renderToString(ctxClone);
  const filename = $path.join(config.dir.static, url, 'index.html');
  fse.outputFile(filename, html);
};

class Publish {
  async post (ctx) {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const data = ctx.request.body;
    const articlesPromises = data.articleIds.map(async (id) => {
      const renderer = await createRenderer(isDev && ctx.app.$devServer);
      return renderArticle(ctx, renderer, id);
    });

    const categoryPromises = data.categoryIds.map(async (id) => {
      return renderCategory(ctx, id);
    });
    const promises = articlesPromises.concat(categoryPromises);

    if (data.includeIndex) {
      const renderer = await createRenderer(isDev && ctx.app.$devServer);
      promises.push(renderIndex(ctx, renderer));
    }
    await Promise.all(promises);
    success(ctx, { msg: 'success' });
  }
}

export default Publish;
