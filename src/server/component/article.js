import Restfull from './_restfull';
import articleHelper from '../helper/article';
import db from '../db';
import ctxHelper from '../helper/ctx';

const { success } = ctxHelper;
const { knex } = db;

class Article extends Restfull {
  async post(ctx) {
    if (ctx.params.id === 'search') {
      const { keyword, _page, _num } = ctx.request.body;
      const from = (_page - 1) * _num;
      const size = _num;
      const items = await knex(this.name).where('content', 'like', `%${keyword}%`).limit(size).offset(from);
      const total = (await knex(this.name).where('content', 'like', `%${keyword}%`).count('* as count'))[0].count;
      success(ctx, { items, total });
    } else {
      ctx.request.body.summary = articleHelper.summary(ctx.request.body.content);
      await super.post(ctx);
    }
  }

  async put(ctx) {
    ctx.request.body.summary = articleHelper.summary(ctx.request.body.content);
    await super.put(ctx);
  }
}

export default Article;
