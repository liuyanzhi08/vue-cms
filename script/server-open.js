require('@babel/register');
require('@babel/polyfill');

const os = require('os');
const dns = require('dns');
const opn = require('opn');
const config = require('./dev.webpack.config.babel').default;

dns.lookup(os.hostname(), (err, add) => {
  opn(`http://${add}:${config.devServer.port}/${config.devServer.openPage}`);
});
