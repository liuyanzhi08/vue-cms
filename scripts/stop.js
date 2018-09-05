require("babel-register");
require("babel-polyfill");

const stop = require('kill-port');
const port = require('../src/server/config').server.port;
stop(port);
