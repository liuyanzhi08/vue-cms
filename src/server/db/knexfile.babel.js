require('babel-register');
require('babel-polyfill');

module.exports = require('./knexfile').default;
