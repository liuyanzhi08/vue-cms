import query from '../db/query'
import _ from 'lodash'
import Vue from 'vue'
import moment from 'moment'

class Restfull {
    constructor(name) {
        this.name = name
    }

    get(ctx) {
        return new Promise((resolve, reject) => {
            let params = {}
            // list
            if (ctx.params.id === undefined) {
                params = {
                    _page: '1',
                    _num: '10'
                }
                _.extend(params, ctx.query);
                console.log(ctx.params, ctx.query, params)

                // add where logic
                let excludes = {
                    _page: true,
                    _num: true
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

                query(sql, [
                    (+params._page - 1) * +params._num,
                    +params._num,
                    this.name
                ], function (error, results, fields) {
                    ctx.response.body = {
                        items: results[0],
                        total: results[1][0].total
                    }

                    if (error) throw error
                    resolve(results)
                })
            }
            // detail
            else {
                _.extend(params, {id: ctx.params.id});
                query(`SELECT * FROM ${this.name} WHERE id = ?`, [params.id], function (error, results, fields) {
                    ctx.response.body = results[0]

                    if (error) throw error
                    resolve(results)
                })
            }
        })
    }

    post(ctx) {
        return new Promise((resolve, reject) => {
            let obj = ctx.request.body
            obj.create_time = moment().format('YYYY-MM-DD HH:mm:ss')
            query(`INSERT INTO ${this.name} SET ?`, obj, function (error, results, fields) {
                if (error) {
                    console.error(error)
                } else {
                    obj.id = results.insertId;
                    ctx.response.body = obj
                    resolve(obj)
                }
            });

        })
    }

    put(ctx) {
        return new Promise((resolve, reject) => {
            let obj = ctx.request.body

            query(`UPDATE ${this.name} SET ? WHERE id = ?`, [obj, obj.id], function (error, results, fields) {
                ctx.response.body = obj

                if (error) throw error;
                resolve(obj)
            });
        })
    }
}

export default Restfull