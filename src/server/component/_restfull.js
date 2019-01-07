import _ from 'lodash';
import moment from 'moment';
import query from '../db/query';
import ctxHelper from '../helper/ctx';
import config from '../config';
import db from '../db';
import error from '../helper/error';

const { success, fail } = ctxHelper;
const { knex } = db;
const { reject } = Promise;

class Restfull {
  constructor(name, options = {
    auth: {
      get: false,
      post: true,
      put: true,
      delete: true,
    },
  }) {
    this.name = `${config.db.prefix}_${name}`;
    this.options = options;
  }

  async get(ctx) {
    if (this.options.auth.get && !ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }
    let params = {};
    // list
    if (ctx.params.id === undefined) {
      params = {
        _page: '1',
        _num: '10',
      };
      _.extend(params, ctx.query);

      // add where logic
      const excludes = {
        _page: true,
        _num: true,
        _from: true,
        _size: true,
        _sort: true,
        _dir: true,
      };

      // WHERE statement
      let whereLogic = [];
      _.each(params, (value, key) => {
        if (!(key in excludes)) {
          whereLogic.push([key, value].join(' = '));
        }
      });

      // ORDER BY statement
      const sort = params._sort ? params._sort : 'id';
      const dir = params._dir ? params._dir : 'ASC';

      let sql;
      if (whereLogic.length) {
        whereLogic = whereLogic.join(' and ');
        whereLogic = ` WHERE ${whereLogic}`;
        sql = `SELECT * FROM ${this.name} ${whereLogic} ORDER BY \`${sort}\` ${dir} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name} ${whereLogic}`;
      } else {
        sql = `SELECT * FROM ${this.name} ORDER BY \`${sort}\` ${dir} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name}`;
      }
      const from = params._from ? +params._from : (+params._page - 1) * +params._num;
      const size = params._size ? +params._size : +params._num;
      const res = await query(sql, [from, size]).catch(err => reject(fail(ctx, err)));
      const { results } = res;
      const total = results ? results[1][0].total : 0;
      const items = results[0];
      success(ctx, {
        items,
        total,
      });
      return;
    }
    // detail
    _.extend(params, { id: ctx.params.id });
    try {
      const res = await query(`SELECT * FROM ${this.name} WHERE id = ?`, [params.id]);
      const { results } = res;
      if (results.length) {
        success(ctx, results[0]);
      } else {
        fail(ctx, error['404'], { code: 404 });
      }
    } catch (e) {
      fail(ctx, e);
    }
  }

  async post(ctx) {
    if (this.options.auth.post && !ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const obj = ctx.request.body;
    await query(`INSERT INTO ${this.name} SET ?`, obj).then(
      (res) => {
        const { results } = res;
        obj.id = results.insertId;
        return success(ctx, obj);
      },
      err => fail(ctx, err),
    );
  }

  async put(ctx) {
    if (this.options.auth.put && !ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }

    const obj = ctx.request.body;
    obj.updated_at = moment().format('YYYY-MM-DD HH:mm:ss');
    delete obj.created_at;
    await query(`UPDATE ${this.name} SET ? WHERE id = ?`, [obj, obj.id]).then(
      () => success(ctx, obj),
      err => reject(fail(ctx, err)),
    );
  }

  async delete(ctx) {
    if (this.options.auth.delete && !ctx.isAuthenticated()) {
      fail(ctx, error.authUnauthorized, { code: 401 });
      return;
    }
    if (ctx.params.id === undefined) {
      fail(ctx, { msg: 'method `delete` need a `id` params' });
      return;
    }

    await knex(this.name)
      .where('id', ctx.params.id)
      .del()
      .then(() => success(ctx, { id: ctx.params.id }))
      .catch(err => reject(fail(ctx, err)));
  }
}

export default Restfull;
