import puppeteer from 'puppeteer'
import fs from 'fs';

const savePage = (url, path) => {
  return puppeteer.launch({
    headless:false
  }).then(async browser => {
    const page = await browser.newPage();

    await page.goto(url, { waitUntil : 'networkidle0'});

    const content = await page.content();
    fs.writeFileSync(path, content);
    await page.close();
    await browser.close();
    return content;
  });
};

const saveSite = async (url, path) => {
  const content = await savePage(url, `${path}/index.html`);
  var reg = /<a[^<]+href=['"]([^'"]+)['"][^<]*>/gi;
  let result;
  while((result = reg.exec(content)) !== null) {
    const subPath = result[1];
    console.log(subPath)
  }
};

export { savePage, saveSite };