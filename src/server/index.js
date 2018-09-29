require('@babel/register');
require('@babel/polyfill');
const Server = require('./core.js').default;

module.exports = new Server();
