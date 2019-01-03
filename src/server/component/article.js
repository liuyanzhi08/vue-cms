import Restfull from './_restfull';
import articleHelper from '../helper/article';

class Article extends Restfull {
  async post(ctx) {
    ctx.request.body.summary = articleHelper.summary(ctx.request.body.content);
    await super.post(ctx);
  }

  async put(ctx) {
    ctx.request.body.summary = articleHelper.summary(ctx.request.body.content);
    await super.put(ctx);
  }
}

export default Article;
