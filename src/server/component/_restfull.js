import query from '../db/query'
import _ from 'lodash'

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

                query(`SELECT * FROM ${this.name} LIMIT ?, ?;SELECT COUNT(*) AS total FROM ${this.name}`, [
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
            var article = {
                title: ctx.request.body.title,
                content: ctx.request.body.content,
                create_time: new Date()
            }

            query('INSERT INTO article SET ?', article, function (error, results, fields) {
                article.id = results.insertId;
                ctx.response.body = article

                if (error) throw error;
                resolve(article)
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