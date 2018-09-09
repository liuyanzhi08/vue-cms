import puppeteer from 'puppeteer'
import fse from 'fs-extra';
import {server, path} from "../config";
import _ from 'lodash';
import cheerio from 'cheerio';
import { log, err } from './logger';

const getContent = (url) => {
  return puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    ignoreHTTPSErrors: true,
    dumpio: false,
  }).then(async browser => {
    const page = await browser.newPage();
    await page.goto(url, { waitUntil : 'networkidle0'});

    const content = await page.content();
    await page.close();
    await browser.close();
    return content;
  });
};

const savePageRecurse = async (url, root, name) => {
  let content = await getContent(url);
  const reg = /<a[^<]+href=['"]([^'"]+)['"][^<]*>/gi;
  const subPaths = {};
  let result;
  while((result = reg.exec(content)) !== null) {
    const subPath = result[1];
    subPaths[subPath] = 1;
  }
  _.forEach(subPaths, (value, subPath) => {
    const userRootReg = new RegExp(`^${path.user}/`)
    const subSaveName = subPath.replace(userRootReg, '')
      .replace(/\//gi, '-') + '.html';

    // replace link in parent html
    const subLink = `./${subSaveName}`;
    const subReg = new RegExp(subPath, 'gi');
    content = content.replace(subReg, subLink);

    // recurse save sub pages
    const subUrl = `${server.url}${subPath}`;
    savePageRecurse(subUrl, root, subSaveName)
  });
  const savePath = `${root}/${name}`;

  // move index.bundle.js to head
  const $ = cheerio.load(content);
  $('head script:first-of-type').before($('body script'));

  fse.outputFile(savePath, $.html(), (err) => {
    if (err) {
      err(`fail to save => ${savePath}`);
    };
    log(`saved => ${savePath}`);
  });
};

export { savePageRecurse };
