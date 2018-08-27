import query from '../db/query'
import fs from 'fs'
import path from 'path'
import {db} from '../config'
import puppeteer from 'puppeteer'

export default {
    get: function (ctx) {
        return new Promise((resolve, reject) => {
          puppeteer.launch({
            headless:false
          }).then(async browser => {
            const page = await browser.newPage();

            await page.goto('http://localhost:1991/article/1', { waitUntil : 'networkidle0'});

            const content = await page.content();
            fs.writeFileSync(path.resolve(__dirname, 'test.html'), content);
            await page.close();
            await browser.close();
            ctx.response.body = { code: 200 };
            resolve();
          });
        })
    }
}


