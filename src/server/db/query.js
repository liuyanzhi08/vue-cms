import mysql from 'mysql'
import {db} from '../config'

const pool = mysql.createPool({
    host: 'localhost',
    user: db.user,
    password : db.password,
    database : db.database,
    multipleStatements: true,
    dateStrings: true
})

var query = function (sql, options, callback) {
    pool.getConnection(function(err, connection) {
        if (err) {
            console.error(err)
            return
        }
        // Use the connection
        connection.query(sql, options, function (error, results, fields) {
            callback && callback(error, results, fields)
            connection.release()
        });
    });
}

export default query