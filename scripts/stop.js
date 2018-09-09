require("babel-register");
require("babel-polyfill");

const stop = require('kill-port');
const port = require('../src/config').server.port;
stop(port);
