import Joi from 'joi';
import axios from 'axios';
import cheerio from 'cheerio';
import fse from 'fs-extra';
import url from 'url';
import config from '../config';
import ctxHelper from '../helper/ctx';
import ssrHelper from '../helper/ssr';
import error from '../helper/error';
import env from '../helper/env';
import article from '../models/article';
import logger from '../helper/logger';
import util from '../util';

const { success, fail } = ctxHelper;
const { createRenderer } = ssrHelper;
const { isDev } = env;
const { err } = logger;

const schema = Joi.object().keys({
  category: Joi.object().keys({
    id: Joi.number().integer().min(1).required(),
  }),
  list: Joi.object().keys({
    url: Joi.string().regex(/^https*:\/\/.*$/).required(),
    selector: Joi.string().required(),
  }),
  detail: Joi.object().keys({
    selector: Joi.string().required(),
    theme: Joi.string().required(),
  }),
});


class Spider {
  async post (ctx) {
    if (!ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const data = ctx.request.body;
    const result = Joi.validate(data, schema);
    if (result.error) {
      fail(ctx, { msg: result.error.message });
      return;
    }
    const categoryId = data.category.id;
    const listUrl = data.list.url;
    const listSelector = data.list.selector;
    const detailSelector = data.detail.selector;
    const detailTheme = data.detail.theme;
    const listUrlObj = url.parse(listUrl);
    const siteRoot = listUrlObj.path !== '/' ? listUrl.slice(0, listUrl.indexOf(listUrlObj.path) + 1) : listUrlObj.href;

    const res = await axios.get(listUrl);
    const $ = cheerio.load(res.data);
    const links = $(`${listSelector}`);
    const articles = Array.from(links).map((item) => {
      const articleUrl = item.attribs.href.indexOf('http') === -1
        ? `${siteRoot}${item.attribs.href}` : item.attribs.href;
      return {
        url: articleUrl,
        title: $(item).text(),
      };
    });
    if (!articles.length) {
      fail(ctx, error.spiderListLinkNotFound);
      return;
    }
    const successArticleUrls = [];
    const failedArticleUrls = [];
    await util.asyncForEach(articles, async (articleData) => {
      let detailRes;
      try {
        detailRes = await axios.get(articleData.url);
        successArticleUrls.push(articleData.url);
      } catch (e) {
        failedArticleUrls.push(articleData.url);
        err(`spider: fail to fetch '${articleData.url}'`);
        return;
      }
      const detailHtml = detailRes.data;
      const $detail = cheerio.load(detailHtml);
      const content = $detail(detailSelector).html();
      // console.log(articleData.url, detailRes.data);return;
      await article.save({
        title: articleData.title,
        category_id: categoryId,
        content,
        theme: detailTheme,
      });
    });
    success(ctx, { successArticleUrls, failedArticleUrls });
  }
}

export default Spider;
