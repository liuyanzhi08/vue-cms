import puppeteer from 'puppeteer'
import fse from 'fs-extra';
import {server} from "../config";
import _ from 'lodash';
import {userRoot} from "../../client/config";

const getContent = (url) => {
  return puppeteer.launch({
    headless:false
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
    const userRootReg = new RegExp(`^${userRoot}/`)
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

  fse.outputFile(savePath, content, (err) => {
    if (err) {
      console.error(`fail to save => ${savePath}`);
    };
    console.log(`saved => ${savePath}`);
  });
};

export { savePageRecurse };