require('@babel/register');
require('@babel/polyfill');

const path = require('path');
const mysqlImport = require('mysql-import');
const fs = require('fs');
const chalk = require('chalk');
const { db, dir } = require('../../src/server/config').default;

const sqlPath = path.join(dir.root, process.argv[2] || 'data.sql');
if (!fs.existsSync(sqlPath)) {
  console.error(chalk.red(`[db]: ${sqlPath}' not found`));
  return;
}

mysqlImport.config({
  host: 'localhost',
  user: db.username,
  password: db.password,
  database: db.database,
  onerror: err => console.log(err.message),
}).import(sqlPath).then(() => {
  console.log(chalk.green('[db]: all statements have been executed'));
});
