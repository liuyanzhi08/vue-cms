import query from '../db/query'
import _ from 'lodash'
import Vue from 'vue'
import moment from 'moment'

import { success, fail } from '../helper/ctx';

class Restfull {
  constructor(name, options = { auth: true }) {
    this.name = name;
    this.options = options;
  }

  get(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
      }
      let params = {}
      // list
      if (ctx.params.id === undefined) {
        params = {
          _page: '1',
          _num: '10'
        }
        _.extend(params, ctx.query);

        // add where logic
        let excludes = {
          _page: true,
          _num: true,
          _from: true,
          _size: true
        }
        let whereLogic = []
        _.each(params, function (value, key) {
          if (!(key in excludes)) {
            whereLogic.push([key, value].join(' = '))
          }
        })

        let sql
        if (whereLogic.length) {
          whereLogic = whereLogic.join(' and ')
          whereLogic = ' WHERE ' + whereLogic
          sql = `SELECT * FROM ${this.name} ${whereLogic} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name} ${whereLogic}`
        } else {
          sql = `SELECT * FROM ${this.name} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name}`
        }

        let from = params._from ? +params._from : (+params._page - 1) * +params._num
        let size = params._size ? +params._size : +params._num;
        query(sql, [from, size]).then(
          (res) => {
            var results = res.results
            var items = results ? results[0] : []
            var total = results ? results[1][0].total : 0
            ctx.response.body = {
              items: items,
              total: total
            };
            resolve(res);
          },
          (err) => {
            ctx.body = err;
            ctx.status = 500;
            reject(err);
          }
        )
      }
      // detail
      else {
        _.extend(params, {id: ctx.params.id});
        query(`SELECT * FROM ${this.name} WHERE id = ?`, [params.id]).then(
          (res) => {
            var results = res.results
            ctx.response.body = results[0]
            resolve(res)
          },
          (err) => {
            reject(err)
          }
        )
      }
    })
  }

  post(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
      }

      let obj = ctx.request.body
      obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
      query(`INSERT INTO ${this.name} SET ?`, obj).then(
        (res) => {
          var results = res.results
          obj.id = results.insertId
          ctx.response.body = obj
          resolve(obj)
        },
        (err) => {
          reject(err)
        }
      )
    })
  }

  put(ctx) {
    return new Promise((resolve, reject) => {
      if (this.options.auth && !ctx.isAuthenticated()) {
        return fail(reject, ctx, { msg: 'auth fail' }, { code: 401 });
      }

      let obj = ctx.request.body
      obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
      query(`UPDATE ${this.name} SET ? WHERE id = ?`, [obj, obj.id]).then(
        (res) => {
          ctx.response.body = obj
          resolve(res)
        },
        (err) => {
          ctx.response.body = err
          ctx.response.status = 500
          reject(err)
        }
      )
    })
  }
}

export default Restfull