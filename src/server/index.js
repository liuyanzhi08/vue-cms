require('@babel/register');
require('@babel/polyfill');
const Core = require('./core.js').default;

module.exports = new Core();
