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

            await page.goto('https://www.baidu.com');

            console.log(page.content())
          });
        })
    }
}


