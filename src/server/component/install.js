import query from '../db/query'

export default {
    get: function (ctx) {
        return new Promise((resolve, reject) => {
            console.log(query)
            query('CREATE DATABASE cms', (error, result, fields) => {
                console.log(error, result)
                ctx.response.body = error
                resolve(result)
            })
        })
    }
}


