import Joi from 'joi';
import axios from 'axios';
import cheerio from 'cheerio';
import fse from 'fs-extra';
import Turndown from 'turndown';
import config from '../config';
import ctxHelper from '../helper/ctx';
import ssrHelper from '../helper/ssr';
import regHelper from '../helper/reg';
import urlHelper from '../helper/url';
import error from '../helper/error';
import env from '../helper/env';
import netHelper from '../helper/net';
import article from '../models/article';
import logger from '../helper/logger';
import util from '../util';

const { success, fail } = ctxHelper;
const { log, err } = logger;
const turndown = new Turndown();

const grabImg = (html, siteRoot) => {
  let result;
  let newHtml = html;
  const savedImageMap = {};
  do {
    result = regHelper.img.exec(html);
    if (result) {
      let imgUrl = result[1];
      if (!savedImageMap[imgUrl]) {
        const rawSiteRoot = siteRoot.replace(/\/$/, '');
        if (imgUrl.indexOf('http') === -1) {
          imgUrl = `${rawSiteRoot}${imgUrl}`;
        }
        const newName = netHelper.downloadFile(imgUrl);
        savedImageMap[imgUrl] = true;
        newHtml = newHtml.replace(new RegExp(result[1], 'g'), newName);
      }
    }
  } while (result);
  return newHtml;
};

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
    const siteRoot = urlHelper.root(listUrl);

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
    let failedImgUrls;
    await util.asyncForEach(articles, async (articleData) => {
      let detailRes;
      try {
        detailRes = await axios.get(articleData.url);
        successArticleUrls.push(articleData.url);
        log(`spider: success to fetch '${articleData.url}'`);
      } catch (e) {
        failedArticleUrls.push(articleData.url);
        err(`spider: fail to fetch '${articleData.url}'`);
        return;
      }
      const detailHtml = detailRes.data;
      const $detail = cheerio.load(detailHtml, {
        decodeEntities: false,
        normalizeWhitespace: true,
      });
      const content = $detail(detailSelector).html();
      const newContent = await grabImg(content, siteRoot);
      await article.save({
        title: articleData.title,
        category_id: categoryId,
        content: turndown.turndown(newContent),
        theme: detailTheme,
      });
    });
    success(ctx, { successArticleUrls, failedArticleUrls });
  }
}

export default Spider;
