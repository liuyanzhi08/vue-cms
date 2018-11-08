import _ from 'lodash';
import moment from 'moment';
import query from '../db/query';
import ctxHelper from '../helper/ctx';
import config from '../config';
import db from '../db';

const { success, fail } = ctxHelper;
const { knex } = db;
const { reject } = Promise;

class ResourceKoa {
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
      await reject(fail(ctx, { msg: 'auth fail' }, { code: 401 }));
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
      };
      let whereLogic = [];
      _.each(params, (value, key) => {
        if (!(key in excludes)) {
          whereLogic.push([key, value].join(' = '));
        }
      });

      let sql;
      if (whereLogic.length) {
        whereLogic = whereLogic.join(' and ');
        whereLogic = ` WHERE ${whereLogic}`;
        sql = `SELECT * FROM ${this.name} ${whereLogic} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name} ${whereLogic}`;
      } else {
        sql = `SELECT * FROM ${this.name} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name}`;
      }

      const from = params._from ? +params._from : (+params._page - 1) * +params._num;
      const size = params._size ? +params._size : +params._num;
      const res = await query(sql, [from, size]).catch(err => reject(fail(ctx, err)));
      const { results } = res;
      const items = results ? results[0] : [];
      const total = results ? results[1][0].total : 0;
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
      success(ctx, results);
    } catch (e) {
      fail(ctx, e);
    }
  }

  async post(ctx) {
    if (this.options.auth.post && !ctx.isAuthenticated()) {
      reject(fail(ctx, { msg: 'auth fail' }, { code: 401 }));
      return;
    }

    const obj = ctx.request.body;
    await query(`INSERT INTO ${this.name} SET ?`, obj).then(
      (res) => {
        const { results } = res;
        obj.id = results.insertId;
        return success(ctx, obj);
      },
      err => reject(fail(ctx, err)),
    );
  }

  async put(ctx) {
    if (this.options.auth.put && !ctx.isAuthenticated()) {
      reject(fail(ctx, { msg: 'auth fail' }, { code: 401 }));
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
    if (this.options.auth.get && !ctx.isAuthenticated()) {
      reject(fail(ctx, { msg: 'auth fail' }, { code: 401 }));
      return;
    }
    if (ctx.params.id === undefined) {
      reject(fail(ctx, { msg: 'method `delete` need a `id` params' }));
      return;
    }

    await knex(this.name)
      .where('id', ctx.params.id)
      .del()
      .then(res => success(ctx, { id: res }))
      .catch(err => reject(fail(ctx, err)));
  }
}

export default ResourceKoa;
