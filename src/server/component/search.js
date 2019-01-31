import Restfull from './_restfull';
import db from '../db';
import ctxHelper from '../helper/ctx';

const { success } = ctxHelper;
const { knex } = db;

class Search extends Restfull {
  async get(ctx) {
    const { keyword, _page, _num } = ctx.query;
    const from = (_page - 1) * _num;
    const size = _num;
    const items = await knex(this.name).where('content', 'like', `%${keyword}%`).limit(size).offset(from);
    const total = (await knex(this.name).where('content', 'like', `%${keyword}%`).count('* as count'))[0].count;
    success(ctx, { items, total });
  }
}

export default Search;
