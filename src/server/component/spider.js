import Joi from 'joi';
import axios from 'axios';
import cheerio from 'cheerio';
import Turndown from 'turndown';
import ctxHelper from '../helper/ctx';
import regHelper from '../helper/reg';
import urlHelper from '../helper/url';
import articleHelper from '../helper/article';
import error from '../helper/error';
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

const grabListArticles = async (
  url, categoryId, listSelector, detailSelector, detailTheme,
) => {
  const siteRoot = urlHelper.root(url);
  const res = await axios.get(url);
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
  const successArticleUrls = [];
  const failedArticleUrls = [];
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
      summary: articleHelper.summary(newContent),
      theme: detailTheme,
    });
  });
  return {
    successArticleUrls,
    failedArticleUrls,
  };
};

const listUrlReg = /\$range\((\d+),\s*(\d+)\)/i;
const parseListUrl = (url) => {
  const urls = [];
  const matched = url.match(listUrlReg);
  if (!matched) {
    urls.push(url);
  } else {
    const start = +matched[1];
    const end = +matched[2];
    for (let i = start; i < end; i += 1) {
      urls.push(url.replace(listUrlReg, i));
    }
  }
  return urls;
};

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

    let allSuccessArticleUrls = [];
    let allFailedArticleUrls = [];
    const listUrls = parseListUrl(listUrl);
    await util.asyncForEach(listUrls, async (url) => {
      const { successArticleUrls, failedArticleUrls } = await grabListArticles(
        url, categoryId, listSelector, detailSelector, detailTheme,
      );
      allSuccessArticleUrls = allFailedArticleUrls.concat(successArticleUrls);
      allFailedArticleUrls = allFailedArticleUrls.concat(failedArticleUrls);
    });
    if (!allSuccessArticleUrls.length && !allFailedArticleUrls.length) {
      fail(ctx, error.spiderListLinkNotFound);
      return;
    }
    success(ctx, { allSuccessArticleUrls, allFailedArticleUrls });
  }
}

export default Spider;
