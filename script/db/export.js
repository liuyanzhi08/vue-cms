require('@babel/register');
require('@babel/polyfill');

const path = require('path');
const mysqldump = require('mysqldump');
const chalk = require('chalk');
const { db, dir } = require('../../src/server/config').default;

const sqlPath = path.join(dir.root, process.argv[2] || 'data.sql');
mysqldump({
  connection: {
    host: 'localhost',
    user: db.username,
    password: db.password,
    database: db.database,
  },
  dumpToFile: sqlPath,
});
console.log(chalk.green(`[db]: successfully exported to '${sqlPath}'`));
