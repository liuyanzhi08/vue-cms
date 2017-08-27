import mysql from 'mysql'

const pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'blog',
    multipleStatements: true
})

var query = function (sql, options, callback) {
    pool.getConnection(function(err, connection) {
        // Use the connection
        connection.query(sql, options, function (error, results, fields) {
            callback && callback(err, results, fields)
            connection.release()
            if (error) throw error
        });
    });
}

export default query