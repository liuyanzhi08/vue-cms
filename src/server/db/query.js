import mysql from 'mysql';
import config from '../config';

const { db } = config;

const currentPool = mysql.createPool({
  host: 'localhost',
  user: db.username,
  password: db.password,
  database: db.database,
  multipleStatements: true,
  dateStrings: true,
});

const globalPool = mysql.createPool({
  host: 'localhost',
  user: db.username,
  password: db.password,
  multipleStatements: true,
  dateStrings: true,
});

const query = async (sql, options) => {
  const pool = options === true ? globalPool : currentPool;
  const res = await new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      // Use the connection
      connection.query(sql, options, (error, results, fields) => {
        if (error) {
          reject(error);
          return;
        }
        connection.release();
        resolve({
          results,
          fields,
        });
      });
    });
  });
  return res;
};

export default query;
