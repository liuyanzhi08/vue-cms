require('@babel/register');
require('@babel/polyfill');

const { db } = require('../src/config').default;
const { query } = require('../src/server/db');

query(`CREATE DATABASE  ${db.database}`, true).then(
  () => process.exit(0),
  (err) => {
    console.error(err);
    process.exit(1);
  },
);
