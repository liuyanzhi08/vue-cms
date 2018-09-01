import mysql from 'mysql'
import {db} from '../config'

const currentPool = mysql.createPool({
  host: 'localhost',
  user: db.user,
  password: db.password,
  database: db.database,
  multipleStatements: true,
  dateStrings: true
})

const globalPool = mysql.createPool({
  host: 'localhost',
  user: db.user,
  password: db.password,
  multipleStatements: true,
  dateStrings: true
})

var query = function (sql, options) {
  var pool = options === true ? globalPool : currentPool
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        reject(err)
        return
      }
      // Use the connection
      connection.query(sql, options, function (error, results, fields) {
        if (error) {
          reject(error)
          return
        }
        connection.release()
        resolve({
          results: results,
          fields: fields
        })
      });
    });
  })
}

export default query