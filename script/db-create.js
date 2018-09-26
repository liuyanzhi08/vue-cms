require('@babel/register');
require('@babel/polyfill');

const fs = require('fs');
const path = require('path');
const nanoid = require('nanoid');
const { db } = require('../src/config').default;
const { query } = require('../src/server/db');

const log = (msg, method = 'log') => {
  // eslint-disable-next-line
  if (typeof msg === 'object') {
    console[method]('db:', msg);
  } else {
    console[method](`db: ${msg}`);
  }
};

const modifyConfig = (dbName) => {
  const configPath = path.resolve(__dirname, '../src/config.js');
  let configText = fs.readFileSync(configPath).toString();
  const reg = /database\s*:\s*['"][^'"]+['"]/gi;
  const matches = configText.match(reg);
  if (matches) {
    const newConfig = `database: '${dbName}'`;
    configText = configText.replace(reg, newConfig);
    fs.writeFileSync(configPath, configText);
    const oldConfig = matches[0];
    log(`successfully wrote \`config.js\` | \`${oldConfig}\` -> \`${newConfig}\``);
  } else {
    log('fail to find `database` config in `config.js`', 'error');
  }
};

const createDB = (dbName) => {
  query(`CREATE DATABASE  \`${dbName}\``, true).then(
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
const isRandomMode = process.argv.includes('--random');
if (isRandomMode) {
  dbName = `vms_${nanoid(10)}`;
  modifyConfig(dbName);
} else {
  dbName = db.database;
}
createDB(dbName);
