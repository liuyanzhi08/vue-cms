import query from '../db/query'

export default {
    get: function (ctx) {
        ctx.body = ctx.params;
    },
    post:  function (ctx) {
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
                console.log(article)
                resolve(article)
            });
        })
    }
}