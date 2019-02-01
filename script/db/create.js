require('@babel/register');
require('@babel/polyfill');

const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');
const chalk = require('chalk');
const { db } = require('../../src/config').default;
const { query } = require('../../src/server/db').default;

const log = (msg, method = 'log') => {
  // eslint-disable-next-line
  const color = method === 'log' ? 'green' : 'red';
  const print = chalk[color];
  if (typeof msg === 'object') {
    console[method](print('[db]'), print(msg));
  } else {
    console[method](print(`[db]: ${msg}`));
  }
};

const modifyConfig = (dbName) => {
  const configPath = path.resolve(__dirname, '../../src/config.js');
  let configText = fs.readFileSync(configPath).toString();
  const reg = /database\s*:\s*['"][^'"]+['"]/gi;
  const matches = configText.match(reg);
  if (matches) {
    const newConfig = `database: '${dbName}'`;
    configText = configText.replace(reg, newConfig);
    fs.writeFileSync(configPath, configText);
    const oldConfig = matches[0];
    log(`successfully wrote \`config.js\`: \`${oldConfig}\` -> \`${newConfig}\``);
  } else {
    log('fail to find `database` config in `config.js`', 'error');
  }
};

const createDB = (dbName) => {
  query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8 COLLATE utf8_general_ci`, true).then(
    () => {
      log(`successfully created a new database \`${dbName}\``);
      process.exit(0);
    },
    (err) => {
      log(err, 'error');
      process.exit(1);
    },
  );
};

let dbName;
// random mode: create a db with a random name
const isProductionMode = process.env.NODE_ENV === 'production';
if (isProductionMode) {
  dbName = `vms_${nanoid(10)}`;
  modifyConfig(dbName);
} else {
  dbName = db.database;
}
createDB(dbName);
