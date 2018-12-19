require('@babel/register');
require('@babel/polyfill');

const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { db, dir } = require('../../src/server/config').default;
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

const modifyConfig = () => {
  const configPath = path.join(dir.root, 'src/config.js');
  let configText = fs.readFileSync(configPath).toString();
  const reg = /database\s*:\s*['"][^'"]+['"]/gi;
  const matches = configText.match(reg);
  if (matches) {
    const newConfig = 'database: \'vms\'';
    configText = configText.replace(reg, newConfig);
    fs.writeFileSync(configPath, configText);
    const oldConfig = matches[0];
    log(`successfully wrote \`config.js\`: \`${oldConfig}\` -> \`${newConfig}\``);
  } else {
    log('fail to find `database` config in `config.js`', 'error');
  }
};

const deleteDB = (dbName) => {
  query(`DROP DATABASE IF EXISTS \`${dbName}\``, true).then(
    (res) => {
      let msg;
      if (res.results.affectedRows) {
        msg = `successfully deleted database \`${dbName}\``;
      } else {
        msg = `nothing deleted -> database \`${dbName}\` not exists`;
      }
      log(msg);
      process.exit(0);
    },
    (err) => {
      log(err, 'error');
      process.exit(1);
    },
  );
};

modifyConfig();
deleteDB(db.database);
