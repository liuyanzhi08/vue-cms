require('@babel/register');
require('@babel/polyfill');

const ip = require('ip');
const opn = require('opn');
const config = require('../src/config').default;

opn(`http://${ip.address()}:${config.server.port}/admin`);
