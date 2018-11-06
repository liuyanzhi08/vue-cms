require('@babel/register', { cache: false });
require('@babel/polyfill');
const core = require('./core.js');

const Server = core.default;
module.exports = new Server();
