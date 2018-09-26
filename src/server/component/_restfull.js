import _ from 'lodash';
import moment from 'moment';
import query from '../db/query';
import { success, fail } from '../helper/ctx';
import { db } from '../config';

class Restfull {
  constructor(name, options = {
    auth: {
      get: false,
      post: true,
      put: true,
    },
  }) {
    this.name = `${db.prefix}_${name}`;
    this.options = options;
  }

  get(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth.get && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
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
        console.log(sql)
        query(sql, [from, size]).then(
          (res) => {
            const { results } = res;
            const items = results ? results[0] : [];
            const total = results ? results[1][0].total : 0;
            ctx.response.body = {
              items,
              total,
            };
            resolve(res);
          },
          (err) => {
            ctx.body = err;
            ctx.status = 500;
            reject(err);
          },
        );
      } else {
        // detail
        _.extend(params, { id: ctx.params.id });
        query(`SELECT * FROM ${this.name} WHERE id = ?`, [params.id]).then(
          (res) => {
            const { results } = res;
            [ctx.response.body] = results;
            resolve(res);
          },
          (err) => {
            reject(err);
          },
        );
      }
      return true;
    });
  }

  post(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth.post && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
      }

      const obj = ctx.request.body;
      obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      return query(`INSERT INTO ${this.name} SET ?`, obj).then(
        (res) => {
          const { results } = res;
          obj.id = results.insertId;
          return success(resolve, ctx, obj);
        },
        err => fail(reject, ctx, err),
      );
    });
  }

  put(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth.put && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
      }

      const obj = ctx.request.body;
      obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss');
      return query(`UPDATE ${this.name} SET ? WHERE id = ?`, [obj, obj.id]).then(
        (res) => {
          ctx.response.body = obj;
          resolve(res);
        },
        (err) => {
          ctx.response.body = err;
          ctx.response.status = 500;
          reject(err);
        },
      );
    });
  }
}

export default Restfull;
