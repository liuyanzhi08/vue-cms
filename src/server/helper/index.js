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
  });
};

export { savePage };