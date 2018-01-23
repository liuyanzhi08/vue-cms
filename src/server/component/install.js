import query from '../db/query'
import fs from 'fs'
import path from 'path'
import {db} from '../config'

export default {
    get: function (ctx) {
        return new Promise((resolve, reject) => {
            query(`CREATE DATABASE IF NOT EXISTS ${db.database}`, true)
            .then(
                (res) => {
                    return query(`use ${db.database}`)
                },
                (err) => {
                    throw err
                }
            )
            .then(
                (res) => {
                    var sqlPath = path.join(__dirname, '../db/data.sql')
                    var data = fs.readFileSync(sqlPath, 'utf8')
                    return query(data)
                },
                (err) => {
                    throw err
                }
            )
            .then(
                (res) => {
                    ctx.response.body = res
                    resolve()
                },
                (err) => {
                    ctx.response.body = err
                    reject(err)
                }
            )
        })
    }
}


