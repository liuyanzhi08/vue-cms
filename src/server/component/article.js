import cheerio from 'cheerio';
import Restfull from './_restfull';
import md from '../helper/md';

class Article extends Restfull {
  async post(ctx) {
    await super.post(ctx);
  }

  async put(ctx) {
    const html = md.parse(ctx.request.body.content);
    const $ = cheerio.load(html);
    const plainText = $.text().replace(/\s+/gi, ' ');
    ctx.request.body.summary = plainText.substr(0, 300);
    await super.put(ctx);
  }
}

export default Article;
